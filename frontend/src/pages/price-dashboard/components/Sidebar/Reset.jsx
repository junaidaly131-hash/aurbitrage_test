import { useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { StyledButton, StyledClearIcon } from "./styles";

function ResetDashboard() {
  const {
    setSelectedNode,
    setCategoryFilter,
    setSubCategoryFilter,
    setMintFilter,
    setIsSideBarData,
    setSkuType,
  } = useContext(PricingDashboardContext);
  const ResetDashboardData = () => {
    setSelectedNode("");
    setCategoryFilter("");
    setSubCategoryFilter("");
    setMintFilter("");
    setIsSideBarData(false);
    setSkuType("");
  };
  return (
    <StyledButton onClick={ResetDashboardData}>
      Reset&nbsp;
      <StyledClearIcon fontSize={"small"} />
    </StyledButton>
  );
}

export default ResetDashboard;
