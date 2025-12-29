import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import Company from "./Company";
import Presence from "./Presence";
import Distributers, { Affiliations } from "./Distributers";
import Info from "./Info";
import Addresses, { GuideLines, Shipping } from "./Addresses";
import { useForm, FormProvider } from "react-hook-form";
const steps = [
  "About Company",
  "Online Presence",
  "Authorized Distributors",
  "Other People Info",
  "addresses",
];
import {
  StyledHeading,
  Stylediv,
  StepperContant,
  StepperContantBtn,
  SaveBtn,
  StepLabelStyles,
  StepIconBox,
  FormWrapper,
  Content,
  SkipBtn,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import useGetDealer from "@/pages/Dealer/Hooks/useGetDealer";
import { About } from "./Company/About";
import { AuthorizedContainer, AuthorizedWrapper } from "./Distributers/styles";
import { AddressesWrapper } from "./Addresses/styles";
import toast from "react-hot-toast";
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
export const DealerSettings = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const methods = useForm({ mode: "onTouched" });
  const { data, loading, error, getUser } = useGetDealer();

  const {
    peoples,
    affiliations: { data: affiliations },
    authorizations: { data: authorizations },
  } = useDealers();
  const { getPeople, data: peoplesData } = peoples;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    getPeople(id);
    getUser(id);
  }, [id, getUser, getPeople]);

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handelSkip = () => {
    navigate(-1);
  };
  const handlePayload = (values) => {
    const formData = new FormData();
    switch (activeStep) {
      case 0: {
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
        formData.append("about", values.about);
        return formData;
      }
      case 1: {
        formData.append("socials", JSON.stringify(values.socials));
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
          setActiveStep(activeStep + 1);
        } else {
          toast.error(response);
        }
      } else {
        if (activeStep == 2) {
          localStorage.removeItem("authorizations");
          let isSuccess = true;
          let failedApiMessages = [];
          const authorizationsRes = await addAuthorizations({
            authorizationIds: values.authorizations,
            dealerId: parseInt(id),
          });
          if (!authorizationsRes.success) {
            localStorage.removeItem("authorizations");
            failedApiMessages.push("Faild to Update Authorizations");
            isSuccess = false;
          }

          const affiliationsRes = await addAffliations({
            affiliationIds: values.affiliations,
            dealerId: parseInt(id),
          });
          if (!affiliationsRes.success) {
            failedApiMessages.push("Faild to Update Affiliations");
            isSuccess = false;
          }

          if (isSuccess) {
            toast.success("Update Sucessfully");
            setActiveStep(activeStep + 1);
          } else {
            let message = failedApiMessages;
            toast.error(`${message} Try Again`);
          }
        } else if (activeStep == 4) {
          let a = [false, false, false];
          let failedApiMessages = [];
          for (let i = 1; i <= 3; i++) {
            const addressKey = `address${i}`;
            const addressObj = values.addresses[addressKey] || {};
            if (addressObj.name || addressObj.description || addressObj.id) {
              const addressResponse = await updateAddress({
                dealerId: id,
                ...addressObj,
                id: addressObj?.id,
              });
              if (addressResponse.success) {
                a[0] = true;
              } else {
                a[0] = false;
                if (!failedApiMessages.includes("Address update failed")) {
                  failedApiMessages.push("Address update failed");
                }
              }
            }

            const key = `courier${i}`;
            const obj = values.couriers[key];

            if (obj.isChecked) {
              const courierPayload = {
                dealerId: id,
                reason: obj.reason,
                courierId: obj.courierId,
              };

              const courierResponse = await updateCourier(
                courierPayload,
                obj.api,
              );
              if (courierResponse.success) {
                a[1] = true;
              } else {
                a[1] = false;
                if (!failedApiMessages.includes("Courier update failed")) {
                  failedApiMessages.push("Courier update failed");
                }
              }
            } else {
              if (obj.id || obj.courierId) {
                const deleteResponse = await deleteCourier(
                  obj.id || obj.courierId,
                  id,
                );
                if (deleteResponse.success) {
                  toast.success(`Courier ${i} record deleted`);
                  a[1] = true;
                } else {
                  toast.error(`Courier ${i} delete failed`);
                  a[1] = false;
                }
              }
            }
          }
          const shippingResponse = await addShippingGuide({
            dealerId: id,
            shippingDescription: values.shippingDescription,
          });

          if (shippingResponse.success) {
            a[2] = true;
          } else {
            a[2] = false;
            failedApiMessages.push("Shipping Guide update failed");
          }

          if (a.every((status) => status === true)) {
            toast.success("Update Sucessfully");
            navigate(`/dashboard/dealer/${id}`);
          } else {
            const errorMessage = failedApiMessages;
            toast.error(`${errorMessage}. Please try again.`);
          }
        } else if (activeStep == 3) {
          setActiveStep(activeStep + 1);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Company data={data} />
            <About error={error} loading={loading} getUser={getUser} />
          </>
        );
      case 1:
        return (
          <Presence
            data={data}
            error={error}
            loading={loading}
            getUser={getUser}
          />
        );
      case 2:
        return (
          <AuthorizedContainer>
            <AuthorizedWrapper>
              <Distributers />
              <Affiliations />
            </AuthorizedWrapper>
          </AuthorizedContainer>
        );
      case 3:
        return <Info data={data} />;
      case 4:
        return (
          <AddressesWrapper>
            <Addresses />
            <Shipping />
            <GuideLines />
          </AddressesWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <Stylediv>
      <StyledHeading>
        Welcome to Your Dealer Page
        <SkipBtn onClick={handelSkip}>Skip</SkipBtn>
      </StyledHeading>

      <FormWrapper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepperContant>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                  const stepProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabelStyles
                        StepIconComponent={(props) => (
                          <StepIconBox
                            active={props.active}
                            completed={props.completed}
                          >
                            {props.icon}
                          </StepIconBox>
                        )}
                      ></StepLabelStyles>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Content>{renderStepContent(activeStep)}</Content>

                  <StepperContantBtn>
                    <SaveBtn
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      type="button"
                    >
                      Back
                    </SaveBtn>
                    <SaveBtn type="submit">
                      {isLoading
                        ? "Loading..."
                        : activeStep === steps.length - 1
                          ? "Save"
                          : "Next"}
                    </SaveBtn>
                  </StepperContantBtn>
                </React.Fragment>
              )}
            </StepperContant>
          </form>
        </FormProvider>
      </FormWrapper>
    </Stylediv>
  );
};
