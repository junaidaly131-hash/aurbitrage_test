import { Box } from "@mui/system";
import NodeList from "./NodeList";
const SidebarItems = ({ category, nodes }) => {
  const getCategoryColor = (category) => {
    if (category.includes("Gold")) return "#DBA42D";
    if (category.includes("Silver")) return "#C0C0C0";
    if (category.includes("Platinum")) return "#328D62";
    if (category.includes("Palladium")) return "#1C56A4";
    if (category.includes("Copper")) return "#B87333";
    return "#FFFFFF";
  };
  const iconColor = getCategoryColor(category);
  return (
    <Box>
      <NodeList
        className="sidebar-title"
        selector={category}
        parentName={category}
        nodes={nodes}
        type={"Category"}
        iconColor={iconColor}
      />
    </Box>
  );
};

export default SidebarItems;
