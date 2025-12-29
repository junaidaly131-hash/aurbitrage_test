import { Box, Popover } from "@mui/material";
import { styled } from "@mui/system";

const HeaderBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2.5, 0),
  border: `1px solid ${theme.palette.background.dark3}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  margin: "12px 0",
}));

const QuillContainer = styled("div")(({ theme }) => ({
  minHeight: "300px",
  height: "100%",
  ".ql-container.ql-snow, .ql-toolbar.ql-snow": {
    border: 0,
  },
  "& #editor": {
    minHeight: "10rem",
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    overflowY: "auto",
    color: theme.palette.background.grey,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.background.dark3}`,
  },
  "& .ql-editor": {
    color: theme.palette.background.grey,
    minHeight: "256px",
    "&::before": {
      color: theme.palette.background.grey,
    },
  },
  "& .ql-container": {
    borderRadius: theme.spacing(0, 0, 1, 1),
    border: 0,
  },

  "& .ql-toolbar": {
    position: "sticky",
    top: 0,
    zIndex: "111111",
    backgroundColor: theme.palette.background.dark3,
    color: theme.palette.background.grey,
    "& button svg": {
      stroke: "#fff",
      "&:hover": {
        stroke: theme.palette.secondary.main,
      },
    },
    "& .ql-stroke": {
      stroke: theme.palette.background.grey,

      "& path:hover": {
        stroke: theme.palette.secondary.main,
      },
    },
  },
  "& .ql-picker-label": {
    "&::before": {
      color: theme.palette.background.grey,
    },
  },

  ".ql-snow.ql-toolbar button:hover .ql-stroke": {
    stroke: theme.palette.secondary.main,
  },
  "& .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke": {
    stroke: theme.palette.secondary.main,
  },
  "& .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke": {
    stroke: theme.palette.secondary.main,
  },
  "& .ql-snow.ql-toolbar button:hover": {
    stroke: theme.palette.secondary.main,
  },
  "& .ql-picker-label:hover": {
    stroke: "#191919",
  },

  "& .ql-picker-item::before": {
    border: "1px solid #ddd",
    padding: "4px",
    boxSizing: "border-box",
  },
  "& .ql-picker-item:not([data-value])": {
    width: "auto !important",
  },
  "& .ql-picker-item:not([data-value]):hover": {
    borderColor: "transparent !important",
  },
  "& .ql-picker-item:not([data-value])::before": {
    content: "'No Background'",
    display: "inline-block",
    position: "relative",
    top: "-6px",
    background: "none",
    color: "#000",
    padding: "0px 4px",
    fontSize: "10px",
    border: "1px solid #ddd",
  },
}));

const StyledPopover = styled(Popover)({
  pointerEvents: "none",
  marginTop: "-10px",
  "& .MuiPopover-paper": {
    padding: "6px 12px",
    backgroundColor: "rgba(97, 97, 97, 0.9)",
    color: "#fff",
    maxWidth: 220,
    fontSize: "0.75rem",
    borderRadius: "4px",
  },
});

export { HeaderBox, QuillContainer, ContentBox, StyledPopover };
