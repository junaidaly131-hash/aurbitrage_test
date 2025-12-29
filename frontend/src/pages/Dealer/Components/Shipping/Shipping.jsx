import { useEffect } from "react";
import fedex from "../../../../assets/icons/fedex.svg";
import united from "../../../../assets/icons/united.svg";
import ups from "../../../../assets/icons/ups.svg";
import {
  Table,
  CourierImg,
  ShippingHeading,
  ShippingPara,
  ShippingParaContainer,
  ShipingContainer,
  Error,
  ErrorWrapper,
  RefreshBtn,
  NoData,
} from "./style";
import useGetShipping from "../../Hooks/useGetShipping";
import useGetShippingGuide from "@/pages/Dealer/Hooks/useGetShippingGuide";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const COURIERS = {
  USPS: ups,
  FedEx: fedex,
  FedExy: united,
};
export const Shipping = () => {
  const { id } = useParams();
  const { data, loading, error, fetchShipping } = useGetShipping();
  const {
    fetchShippingGuide,
    loading: sloading,
    error: serror,
    success: success,
    data: sdata,
  } = useGetShippingGuide();
  useEffect(() => {
    if (id) {
      fetchShipping(id);
      fetchShippingGuide(id);
    }
  }, [id, fetchShipping]);
  const FILTERED_DATA = {
    FedEx: data?.find((i) => i.courier?.name === "FedEx"),
    USPS: data?.find((i) => i.courier?.name === "USPS"),
    UPS: data?.find((i) => i.courier?.name === "UPS"),
  };
  const handelclick = () => {
    fetchShipping(id);
    fetchShippingGuide(id);
  };

  const hasNoCouriers = error?.includes("No couriers found for dealer");

  return (
    <ShipingContainer>
      {error && !hasNoCouriers ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Courier</th>
                <th>Used For</th>
              </tr>
            </thead>
            <tbody>
              {!loading && hasNoCouriers && (
                <tr>
                  <td colSpan={2}>
                    <NoData>No couriers found for dealer</NoData>
                  </td>
                </tr>
              )}
              {Object.keys(COURIERS).map((key) => {
                if (loading) {
                  return (
                    <tr key={key}>
                      <td className="p-0">
                        <Skeleton height={"60px"} />
                      </td>
                      <td className="p-0">
                        <Skeleton height={"60px"} />
                      </td>
                    </tr>
                  );
                } else if (FILTERED_DATA[key]) {
                  return (
                    <tr key={key}>
                      <td>
                        <CourierImg src={COURIERS[key]} alt={key} />
                      </td>
                      <td>{FILTERED_DATA[key]?.reason}</td>
                    </tr>
                  );
                } else return null;
              })}
            </tbody>
          </Table>
          <ShippingHeading>Shipping Guidelines</ShippingHeading>
          <ShippingParaContainer>
            {!sloading ? (
              <ShippingPara
                dangerouslySetInnerHTML={{
                  __html: sdata?.shippingDescription || "No Description",
                }}
              />
            ) : (
              <ShippingPara>
                <Skeleton height={40} />
              </ShippingPara>
            )}
          </ShippingParaContainer>
        </>
      )}
    </ShipingContainer>
  );
};
export default Shipping;
