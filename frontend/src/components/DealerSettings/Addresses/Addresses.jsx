import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import useGetAddresses from "@/pages/Dealer/Hooks/useGetAddresses";
import {
  Stylediv,
  AddressesHeading,
  Table,
  Error,
  ErrorWrapper,
  RefreshBtn,
} from "./styles";
import "react-quill/dist/quill.snow.css";
import Input from "../Input";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
export const Addresses = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { id } = useParams();
  const { fetchAddresses, data, loading, error } = useGetAddresses();
  useEffect(() => {
    if (id) {
      fetchAddresses(id);
    }
  }, [id, fetchAddresses]);

  useEffect(() => {
    if (data && Array.isArray(data) && !loading) {
      setValue("addresses.address1", data[0]);
      setValue("addresses.address2", data[1]);
      setValue("addresses.address3", data[2]);
    }
  }, [data, setValue, loading]);
  const handelclick = () => {
    fetchAddresses(id);
  };
  const hasNoAddresses = error?.includes("No addresses found for dealer");

  return (
    <>
      <Stylediv>
        <AddressesHeading>
          Tell us your addresses and reasons to use them.
        </AddressesHeading>
      </Stylediv>
      {!loading && error && !hasNoAddresses ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Address</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <td colSpan={2}>
                <Skeleton width="100%" height="200px" />
              </td>
            )}
            {!loading && (error || !hasNoAddresses) && (
              <>
                <tr>
                  <td>
                    <Input
                      name="addresses.address1.name"
                      placeholder={"Enter First Address"}
                      register={register}
                    />
                  </td>
                  <td>
                    <Input
                      name="addresses.address1.description"
                      placeholder={"Reason for selecting this address"}
                      register={register}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input
                      name="addresses.address2.name"
                      placeholder={"Enter Second Address"}
                      register={register}
                    />
                  </td>
                  <td>
                    <Input
                      name="addresses.address2.description"
                      placeholder={"Reason for selecting this address"}
                      register={register}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input
                      name="addresses.address3.name"
                      placeholder={"Enter Third Address"}
                      register={register}
                    />
                  </td>
                  <td>
                    <Input
                      name="addresses.address3.description"
                      placeholder={"Reason for selecting this address"}
                      register={register}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};
