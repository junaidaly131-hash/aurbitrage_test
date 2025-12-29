import { useFormContext } from "react-hook-form";
import {
  Stylediv,
  AddressesHeading,
  AddressesPara,
  Error,
  ErrorWrapper,
  RefreshBtn,
} from "./styles";
import "react-quill/dist/quill.snow.css";
import useGetShippingGuide from "@/pages/Dealer/Hooks/useGetShippingGuide";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const GuideLines = () => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { loading, data, error, fetchShippingGuide } = useGetShippingGuide();

  useEffect(() => {
    if (id) {
      fetchShippingGuide(id);
    }
  }, [id, fetchShippingGuide]);

  useEffect(() => {
    if (data?.shippingDescription) {
      setValue("shippingDescription", data?.shippingDescription);
    }
  }, [data, setValue]);

  const value = watch("shippingDescription");
  const handelclick = () => {
    fetchShippingGuide(id);
  };
  return (
    <>
      <Stylediv>
        <AddressesHeading>Please Share Shipping Guidelines</AddressesHeading>
      </Stylediv>
      {error ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <Stylediv className="text-editor">
          {loading && <Skeleton width="95%" height="90px" />}
          {!loading && !error && (
            <AddressesPara
              theme="snow"
              value={value}
              onChange={(value) => {
                setValue("shippingDescription", value);
              }}
            />
          )}
        </Stylediv>
      )}
    </>
  );
};
