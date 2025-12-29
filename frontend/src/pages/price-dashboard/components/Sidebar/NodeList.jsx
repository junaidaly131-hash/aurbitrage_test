import { Box } from "@mui/system";
import { useState, useContext, useCallback, useEffect, useRef } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import {
  AddIcon,
  Name,
  NodeTitle,
  RemoveIcon,
  SidebarItem,
  SidebarTitle,
  StyledSidebarTitle,
} from "./styles";
import { useLocation, useNavigate } from "react-router-dom";

const NodeItem = ({
  selector,
  subCategory,
  type,
  iconColor,
  handleCategoryClick,
}) => {
  const handleClick = (e) => {
    handleCategoryClick(selector, type);
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  return (
    <NodeTitle key={subCategory} onClick={handleClick} clr={iconColor}>
      {subCategory}
    </NodeTitle>
  );
};
const NodeList = ({
  selector,
  parentName,
  nodes,
  type,
  iconColor,
  className,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setCategory, selectedNode, setSelectedNode } = useContext(
    PricingDashboardContext,
  );
  let orderedNodes = nodes;
  const { setCategoryFilter, setSubCategoryFilter, setMintFilter, setSkuType } =
    useContext(PricingDashboardContext);
  useEffect(() => {
    if (isOpen && selectedNode.indexOf(selector) !== 0) {
      setIsOpen(false);
    }
  }, [selectedNode, selector, isOpen]);

  const isFinal = useCallback((target) => {
    return target[0]?.value !== undefined;
  }, []);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isInView =
        rect.top >= 0 &&
        rect.top <= viewportHeight &&
        rect.bottom >= 0 &&
        rect.bottom <= viewportHeight;

      if (!isInView) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [isOpen, ref]);

  const handleCategoryClick = (selector, type) => {
    let category = "";
    let subCategory = "";
    let mint = "";

    const parts = selector.split("/");
    if (parts.length === 3) {
      category = parts[0].trim();
      if (type === "mint") {
        mint = parts[2].trim();
        subCategory = parts[1].trim();
      } else if (type === "subcategory") {
        subCategory = parts[2].trim();
        mint = parts[1].trim();
      }
    }
    if (parts.length === 2) {
      category = parts[0].trim();
      if (type === "mint") {
        mint = parts[1].trim();
      } else if (type === "subcategory") {
        subCategory = parts[1].trim();
      }
    }
    setCategoryFilter(category);
    setMintFilter(mint);
    setSubCategoryFilter(subCategory);
    setSkuType(type);
  };
  if (
    !Array.isArray(orderedNodes) &&
    typeof orderedNodes === "object" &&
    orderedNodes !== null &&
    "value" in orderedNodes &&
    "type" in orderedNodes &&
    Object.keys(orderedNodes).length === 2
  ) {
    return (
      <SidebarTitle>
        <NodeItem
          key={parentName}
          selector={selector}
          subCategory={parentName}
          type={type}
          iconColor={iconColor}
          handleCategoryClick={handleCategoryClick}
        />
      </SidebarTitle>
    );
  }

  return (
    <SidebarTitle className={className}>
      <SidebarItem className="sidebar-items">
        <StyledSidebarTitle
          onClick={(e) => {
            setSelectedNode(selector);
            if (type != "Category") {
              handleCategoryClick(selector, type);
            }

            setIsOpen(!isOpen);
            if (pathname !== "/dashboard/pricing/explore-products") {
              setTimeout(() => {
                navigate("/dashboard/pricing/explore-products");
              }, 300);
            }
          }}
          active={isOpen ? "active" : ""}
          clr={iconColor}
        >
          <Name>{parentName}</Name>

          {isOpen ? (
            <RemoveIcon fontSize="medium" clr={iconColor} />
          ) : (
            <AddIcon fontSize="medium" clr={iconColor} />
          )}
        </StyledSidebarTitle>
        <Box
          className={`${isOpen ? "sidebar-open" : "sidebar-content"}`}
          sx={{ pt: "6px" }}
        >
          {isOpen && (
            <Box ref={ref}>
              {isFinal(orderedNodes)
                ? Object.entries(orderedNodes).map(([key, value]) => {
                    return (
                      <NodeList
                        key={`${selector}/${value.value}`}
                        selector={`${selector}/${value.value}`}
                        parentName={value.value}
                        nodes={value}
                        type={value.type}
                        iconColor={iconColor}
                      />
                    );
                  })
                : Object.entries(orderedNodes).map(([key, value]) => {
                    return (
                      <NodeList
                        key={`${selector}/${key}`}
                        selector={`${selector}/${key}`}
                        parentName={key}
                        nodes={value.values}
                        type={value.type}
                        iconColor={iconColor}
                      />
                    );
                  })}
            </Box>
          )}
        </Box>
      </SidebarItem>
    </SidebarTitle>
  );
};

export default NodeList;
