import React from "react";
import { styled } from "@mui/material/styles";

const StyledSvg = styled("svg")(({ theme }) => ({
  width: "24px",
  height: "24px",
  fill: "currentColor",
}));

const EmailTemplateIcon = ({ fontSize = "medium", ...props }) => {
  const size =
    fontSize === "small" ? "16px" : fontSize === "large" ? "32px" : "24px";

  return (
    <StyledSvg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
        fill="currentColor"
      />
      <path d="M4 6H20V8L12 13L4 8V6Z" fill="currentColor" opacity="0.3" />
    </StyledSvg>
  );
};

export default EmailTemplateIcon;
