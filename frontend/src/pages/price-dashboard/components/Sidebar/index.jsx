import { CircularProgress } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Box } from "@mui/system";
import { useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import ResetDashboard from "./Reset";
import { useLocation } from "react-router-dom";
import React from "react";
import { ListLoader, ResetButton, ScrollY, SidebarHeading } from "./styles";
import { PRICING_ROUTES } from "@/constants/pricing-dashboard";

const checkMetal = (category) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes("gold")) {
    return "gold";
  } else if (lowerCategory.includes("silver")) {
    return "silver";
  } else if (lowerCategory.includes("platinum")) {
    return "Platinum";
  } else if (lowerCategory.includes("palladium")) {
    return "Palladium";
  } else if (lowerCategory.includes("copper")) {
    return "Copper";
  }
  return null;
};

const Sidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const { selectedNode, isSideBarData, sideBarCategories } = useContext(
    PricingDashboardContext,
  );
  const isLoading =
    Object.entries(sideBarCategories).length === 0 &&
    (currentRoute === "/dashboard/pricing" ||
      currentRoute === "/dashboard/shortlist");

  if (isLoading) {
    return (
      <ListLoader>
        <CircularProgress />
      </ListLoader>
    );
  }
  let previousMetal = null;
  return (
    <>
      {PRICING_ROUTES.includes(currentRoute) && (
        <>
          <SidebarHeading>Explore Products </SidebarHeading>
          <ScrollY className="sidebar-scroller">
            {Object.entries(sideBarCategories).map(
              ([category, children], index) => {
                const currentMetal = checkMetal(category);
                const addBreak = index > 0 && previousMetal !== currentMetal;
                previousMetal = currentMetal;

                return (
                  <React.Fragment key={category}>
                    {addBreak && <br />}
                    <SidebarItems category={category} nodes={children} />
                  </React.Fragment>
                );
              },
            )}
          </ScrollY>
        </>
      )}
    </>
  );
};

export default Sidebar;
