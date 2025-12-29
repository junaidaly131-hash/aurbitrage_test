import React, { useEffect, useRef, useState } from "react";
import Company from "./Company";
import Presence from "./Presence";
import Distributer, { Affiliations } from "./Distributers";
import Info from "./Info";
import Addresses, { GuideLines, Shipping } from "./Addresses";
import { useForm, FormProvider } from "react-hook-form";
import SaveIcon from "../Icons/SaveIcon";
import GoBackIcon from "../Icons/GoBackIcon";

import {
  StyledHeading,
  Stylediv,
  StepperContant,
  StepperContantBtn,
  FormWrapper,
  TabContent,
  SaveBtnv2,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import useGetDealer from "@/pages/Dealer/Hooks/useGetDealer";
import Tabs from "./Tabs";
import { DEALERS_TABS } from "@/constants/dealer-tabs";
import { About } from "./Company/About";
import { AuthorizedWrapper } from "./Distributers/styles";
import { AddressesWrapper } from "./Addresses/styles";
import toast from "react-hot-toast";
import useGetAuthorizations from "@/pages/Dealer/Hooks/useGetAuthorizations";
import { useDealers } from "@/Context/DealerContext";
import {
  updateDealerDetails,
  updateAddress,
  addAffliations,
  addAuthorizations,
  addShippingGuide,
  updateCourier,
  deleteCourier,
} from "@/apis/dealer";
export const DealerSettingsTabView = () => {
  const [activeStep, setActiveStep] = useState(DEALERS_TABS[0]);

  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef();
  const methods = useForm({ mode: "onTouched" });
  const { data, loading, error, getUser } = useGetDealer();
  const { peoples } = useDealers();
  const {
    getPeople,
    data: peoplesData,
    loading: peoplesLoading,
    error: peoplesError,
  } = peoples;

  const {
    data: authorizations,
    loading: authorizationsLoading,
    error: authorizationsError,
    fetchAuthorizations,
  } = useGetAuthorizations();
  const {
    affiliations: { data: affiliations },
  } = useDealers();

  const [tabHeight, setTabHeight] = useState(0);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAuthorizations(id);
    getPeople(id);
    getUser(id);
  }, [id, getUser, fetchAuthorizations, getPeople]);

  useEffect(() => {
    if (peoplesData) {
      methods.setValue("name", peoplesData?.name);
      methods.setValue("email", peoplesData?.email);
      methods.setValue("phone", peoplesData?.phone);
      methods.setValue("role", peoplesData?.role);
    }
  }, [peoplesData, methods]);

  useEffect(() => {
    if (data) {
      methods.setValue("dealerName", data?.dealerName);
      methods.setValue("dealerAddress", data?.dealerAddress);
      methods.setValue("site", data?.site);
      methods.setValue("phone", data?.phone);
      methods.setValue("yearEstablished", data?.yearEstablished);
      methods.setValue("about", data?.about);
      methods.setValue("profileImage", data?.profileImage);
      setPreview(data?.profileImage);
    }
  }, [data, methods, setPreview]);

  useEffect(() => {
    methods.setValue(
      "authorizations",
      authorizations.map((i) => i.id),
    );
  }, [authorizations, methods]);
  useEffect(() => {
    methods.setValue(
      "affiliations",
      affiliations?.map((i) => i.id),
    );
  }, [affiliations, methods]);

  const updateTabHeight = () => {
    const tabsElement = ref.current;
    if (tabsElement) {
      setTabHeight(tabsElement.clientHeight);
    }
  };
  const refreshUsers = () => {
    getPeople(id);
  };
  const refreshDealer = () => {
    getUser(id);
  };

  useEffect(() => {
    setTimeout(updateTabHeight, 0);
    window.addEventListener("resize", updateTabHeight);

    return () => {
      window.removeEventListener("resize", updateTabHeight);
    };
  }, []);

  const renderStepContent = (step) => {
    switch (step) {
      case DEALERS_TABS[0]:
        return (
          <Company
            data={data}
            preview={preview}
            setPreview={setPreview}
            refreshDealer={refreshDealer}
            loading={loading}
            error={error}
          />
        );
      case DEALERS_TABS[1]:
        return <About error={error} loading={loading} getUser={getUser} />;
      case DEALERS_TABS[2]:
        return (
          <Presence
            data={data}
            error={error}
            loading={loading}
            getUser={getUser}
          />
        );
      case DEALERS_TABS[3]:
        return (
          <AuthorizedWrapper>
            <Distributer />
          </AuthorizedWrapper>
        );
      case DEALERS_TABS[4]:
        return (
          <AuthorizedWrapper>
            <Affiliations />
          </AuthorizedWrapper>
        );
      case DEALERS_TABS[5]:
        return (
          <Info
            loading={peoplesLoading}
            error={peoplesError}
            data={peoplesData}
            refreshUsers={refreshUsers}
          />
        );
      case DEALERS_TABS[6]:
        return (
          <AddressesWrapper>
            <Addresses />
          </AddressesWrapper>
        );
      case DEALERS_TABS[7]:
        return (
          <AddressesWrapper>
            <Shipping />
          </AddressesWrapper>
        );
      case DEALERS_TABS[8]:
        return (
          <AddressesWrapper>
            <GuideLines />
          </AddressesWrapper>
        );
      default:
        return null;
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  const handlePayload = (values) => {
    const formData = new FormData();

    switch (activeStep) {
      case DEALERS_TABS[0]: {
        if (
          values.profileImage instanceof File &&
          values.profileImage !== undefined
        ) {
          formData.append("profileImage", values.profileImage);
        }
        formData.append("dealerName", values.dealerName);
        formData.append("phone", values.phone);
        formData.append("yearEstablished", values.yearEstablished);
        formData.append("site", values.site);
        formData.append("dealerAddress", values.dealerAddress);
        return formData;
      }
      case DEALERS_TABS[1]: {
        formData.append("about", values.about);
        return formData;
      }
      case DEALERS_TABS[2]: {
        const links = JSON.stringify(values.socials);
        formData.append("socials", links);
        return formData;
      }

      default:
        return null;
    }
  };

  const onSubmit = async (values) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const payload = handlePayload(values);
      localStorage.removeItem("dealerData");
      if (payload) {
        const response = await updateDealerDetails(id, payload);
        if (response.success) {
          toast.success("update sucessfully");
        } else {
          toast.error(response);
        }
      } else {
        if (activeStep === DEALERS_TABS[3]) {
          localStorage.removeItem("authorizations");
          const authorizationsRes = await addAuthorizations({
            authorizationIds: values.authorizations,
            dealerId: parseInt(id),
          });
          if (authorizationsRes.success) {
            localStorage.removeItem("authorizations");
            toast.success("Added Authorizations");
          } else {
            toast.error("Failed to add Authorizations");
          }
        }
        if (activeStep === DEALERS_TABS[4]) {
          const affiliationsRes = await addAffliations({
            affiliationIds: values.affiliations,
            dealerId: parseInt(id),
          });
          if (affiliationsRes.success) {
            toast.success("Added Affiliations");
          } else {
            toast.error("Failed to add Affiliations");
          }
        }
        if (activeStep === DEALERS_TABS[6]) {
          for (let i = 1; i <= 3; i++) {
            const key = `address${i}`;
            const obj = values.addresses[key] || {};
            if (obj.name || obj.description || obj.id) {
              const response = await updateAddress({
                dealerId: id,
                ...obj,
                id: obj?.id,
              });
              if (response.success) {
                toast.success(`Updated successfully`);
              } else {
                toast.error(`Updated failed`);
              }
            }
          }
        }
        if (activeStep === DEALERS_TABS[7]) {
          for (let i = 1; i <= 3; i++) {
            const key = `courier${i}`;
            const obj = values.couriers[key];
            if (obj.isChecked) {
              const payload = {
                dealerId: id,
                reason: obj.reason,
                courierId: obj.id || obj.courierId,
              };
              const response = await updateCourier(payload, obj.api);
              if (response.success) {
                toast.success(`Updated successfully`);
              } else {
                toast.error(`Updated failed`);
              }
            } else {
              if (obj.id || obj.courierId) {
                const response = await deleteCourier(
                  obj.id || obj.courierId,
                  id,
                );
                if (response.success) {
                  toast.success(`Record Deleted`);
                } else {
                  toast.error(`Failed to Delete record`);
                }
              }
            }
          }
        }
        if (activeStep === DEALERS_TABS[8]) {
          const response = await addShippingGuide({
            dealerId: id,
            shippingDescription: values.shippingDescription,
          });
          if (response.success) {
            toast.success(`Updated successfully`);
          } else {
            toast.error(`Update failed`);
          }
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stylediv>
      <StyledHeading>Dealer Page Settings</StyledHeading>
      <FormWrapper>
        <Tabs ref={ref} active={activeStep} onChange={setActiveStep} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepperContant>
              <React.Fragment>
                <TabContent tabHeight={tabHeight}>
                  {renderStepContent(activeStep)}
                </TabContent>

                <StepperContantBtn>
                  <SaveBtnv2 color="inherit" type="submit">
                    <SaveIcon />
                    Save Changes
                  </SaveBtnv2>
                  <SaveBtnv2 type="button" back onClick={goBack}>
                    <GoBackIcon />
                    Go Back
                  </SaveBtnv2>
                </StepperContantBtn>
              </React.Fragment>
            </StepperContant>
          </form>
        </FormProvider>
      </FormWrapper>
    </Stylediv>
  );
};
