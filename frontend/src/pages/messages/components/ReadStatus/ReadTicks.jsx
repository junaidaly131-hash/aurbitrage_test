import { Box } from "@mui/material";
import ReadTickIcon from "@/components/Icons/ReadTickIcon";

const ReadTicks = ({ isRead = false, ...props }) => {
  const tickColor = isRead ? "#AF8E4E" : "#ffffff";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <ReadTickIcon color={tickColor} />
    </Box>
  );
};

export default ReadTicks;
