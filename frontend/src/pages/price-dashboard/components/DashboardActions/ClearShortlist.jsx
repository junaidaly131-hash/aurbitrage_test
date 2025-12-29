import { Button } from "@mui/material";
import { styled } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import useRemoveAllFavoritesShortlists from "../../hooks/useRemoveAllFavoritesShortlists";
import toast from "react-hot-toast";
import { useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";

const StyledButton = styled(Button)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 10px",
  gap: "6px",
  background: "#4B1818",
  borderRadius: "12px",
  color: "white",
  textTransform: "none",
  "&:hover": {
    background: "#3A1212",
  },
});

function ClearShortlist() {
  const { setpricingDataView } = useContext(PricingDashboardContext);
  const { removeAll } = useRemoveAllFavoritesShortlists();
  const clearShortlist = async () => {
    const res = await removeAll("shortlist");
    if (res.success) {
      setpricingDataView([]);
      toast.success("Shortlist cleared successfully");
    } else {
      toast.error("Failed to clear shortlist");
    }
  };
  return (
    <StyledButton onClick={clearShortlist}>
      Clear Quick List&nbsp;
      <ClearIcon fontSize={"small"} sx={{ color: "#D80027" }} />
    </StyledButton>
  );
}

export default ClearShortlist;
