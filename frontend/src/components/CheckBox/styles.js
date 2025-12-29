import { styled } from "@mui/material";

const getSizeStyles = (size) => {
  const sizes = {
    small: {
      width: "16px",
      height: "16px",
      iconSize: "10px",
    },
    medium: {
      width: "18px",
      height: "18px",
      iconSize: "12px",
    },
    large: {
      width: "24px",
      height: "24px",
      iconSize: "16px",
    },
  };
  return sizes[size] || sizes.medium;
};

const StyledCheckBoxContainer = styled("div")(
  ({ disabled, labelPlacement }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    flexDirection: labelPlacement === "left" ? "row-reverse" : "row",
    opacity: disabled ? 0.6 : 1,
  }),
);

const StyledCheckBoxWrapper = styled("div")({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledCheckBoxInput = styled("input")({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  cursor: "pointer",
});

const StyledCheckBoxBox = styled("div")(({
  theme,
  checked,
  disabled,
  error,
  size,
}) => {
  const sizeStyles = getSizeStyles(size);

  return {
    width: sizeStyles.width,
    height: sizeStyles.height,
    borderRadius: "4px",
    border: `2px solid ${
      error
        ? theme.palette.danger.main
        : checked
          ? theme.palette.background.grey
          : theme.palette.background.dark2
    }`,
    backgroundColor: checked
      ? theme.palette.background.grey
      : theme.palette.background.dark2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease-in-out",
    cursor: disabled ? "not-allowed" : "pointer",
    position: "relative",
    overflow: "hidden",

    "&:hover": disabled
      ? {}
      : {
          borderColor: error
            ? theme.palette.danger.light
            : theme.palette.secondary.main,
          transform: "scale(1.05)",
        },

    "&:active": disabled
      ? {}
      : {
          transform: "scale(0.95)",
        },
  };
});

const StyledCheckIcon = styled("div")(({ theme, checked, size }) => {
  const sizeStyles = getSizeStyles(size);

  return {
    width: sizeStyles.iconSize,
    height: sizeStyles.iconSize,
    color: checked
      ? theme.palette.secondary.main
      : theme.palette.background.grey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: checked ? "scale(1)" : "scale(0)",
    opacity: checked ? 1 : 0,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };
});

const StyledLabel = styled("label")(({ theme, disabled, error }) => ({
  color: error
    ? theme.palette.danger.main
    : disabled
      ? theme.palette.neutral.main
      : "#ffffff",
  fontSize: "14px",
  fontFamily: "Outfit",
  fontWeight: 400,
  lineHeight: 1.5,
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "color 0.2s ease-in-out",

  "&:hover": disabled
    ? {}
    : {
        color: error
          ? theme.palette.danger.light
          : theme.palette.secondary.main,
      },
}));

export {
  StyledCheckBoxContainer,
  StyledCheckBoxWrapper,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckIcon,
  StyledLabel,
};
