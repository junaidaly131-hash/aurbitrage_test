import { useFormContext } from "react-hook-form";
import {
  Stylediv,
  AddressesHeading,
  Table,
  Error,
  ErrorWrapper,
  RefreshBtn,
} from "./styles";
import Checkbox from "../Checkbox";
import "react-quill/dist/quill.snow.css";
import Input from "../Input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetCouriers from "@/pages/Dealer/Hooks/useGetCouriers";
import { Skeleton } from "@mui/material";
export const Shipping = () => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const { fetchCouriers, data, loading, error } = useGetCouriers();

  useEffect(() => {
    if (id) {
      fetchCouriers(id);
    }
  }, [id, fetchCouriers]);

  useEffect(() => {
    if (data && Array.isArray(data) && !loading) {
      const d1 = data.find((i) => i.courierId === 1);
      const d2 = data.find((i) => i.courierId === 2);
      const d3 = data.find((i) => i.courierId === 3);

      if (d1) {
        setValue("couriers.courier1", { api: true, isChecked: true, ...d1 });
      }
      if (d2) {
        setValue("couriers.courier2", { api: true, isChecked: true, ...d2 });
      }
      if (d3) {
        setValue("couriers.courier3", { api: true, isChecked: true, ...d3 });
      }
    }
  }, [data, setValue, loading]);
  const couriers = [
    {
      id: "1",
      courier: "USPS",
    },
    {
      id: "2",
      courier: "FedEx",
    },
    {
      id: "3",
      courier: "UPS",
    },
  ];
  const formData = watch("couriers");

  const hasNoCouriers = error?.includes("No couriers found for dealer");
  const handelclick = () => {
    fetchCouriers(id);
  };
  return (
    <>
      <Stylediv>
        <AddressesHeading>
          Share the couriers and the purpose you use them for.
        </AddressesHeading>
      </Stylediv>
      {error && !hasNoCouriers ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <Table borderSpacingEnabled>
          <thead>
            <tr>
              <th>Courier</th>
              <th>Reason you guys use it.</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((item, i) => {
              const checked = formData?.[`courier${i + 1}`]?.isChecked;
              return (
                <tr key={item.id}>
                  <td>
                    {loading ? (
                      <Skeleton width="100%" height="60px" />
                    ) : (
                      <Checkbox
                        label={item.courier}
                        id={item.id}
                        checked={checked || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setValue(
                            `couriers.courier${i + 1}.isChecked`,
                            isChecked,
                          );
                          setValue(
                            `couriers.courier${i + 1}.courierId`,
                            formData?.[`courier${i + 1}`]?.courierId || item.id,
                          );
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {loading ? (
                      <Skeleton width="100%" height="60px" />
                    ) : (
                      <Input
                        name={`couriers.courier${i + 1}.reason`}
                        placeholder={"Reason for selecting this address"}
                        register={register}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
