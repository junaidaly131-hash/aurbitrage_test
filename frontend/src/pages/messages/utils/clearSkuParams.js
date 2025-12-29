import { useNavigate } from "react-router-dom";

export const clearSkuParams = (navigate) => {
  const params = new URLSearchParams(window.location.search);

  params.delete("arbitrageSku");
  params.delete("skuDealerName");
  params.delete("trade");

  navigate(`${window.location.pathname}?${params.toString()}`);
};

export const useClearSkuParams = () => {
  const navigate = useNavigate();
  return () => clearSkuParams(navigate);
};
