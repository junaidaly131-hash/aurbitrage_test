import { Table, AddressNumber, ErrorWrapper, Error, RefreshBtn } from "./style";
import useGetAddresses from "@/pages/Dealer/Hooks/useGetAddresses";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const Address = () => {
  const { id } = useParams();
  const { fetchAddresses, data, loading, error } = useGetAddresses();
  useEffect(() => {
    if (id) {
      fetchAddresses(id);
    }
  }, [id, fetchAddresses]);
  const handelclick = () => {
    fetchAddresses(id);
  };
  const hasNoAddresses = error?.includes("No addresses found for dealer");

  if (error && !hasNoAddresses)
    return (
      <ErrorWrapper>
        <Error>{error}</Error>
        <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
      </ErrorWrapper>
    );
  return (
    <Table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {!loading && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id}>
              <td>
                <AddressNumber>{`Address ${index + 1}:`}</AddressNumber>{" "}
                {item.name}
              </td>
              <td>{item.description || "N/A"}</td>
            </tr>
          ))
        ) : loading ? (
          [...Array(data.length || 3)].map((_, index) => (
            <tr key={index}>
              <td>
                <Skeleton height={48} />
              </td>
              <td>
                <Skeleton height={48} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2}>No addresses found for dealer</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
export default Address;
