import { Box, IconButton, Link, styled } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InfoSquareIcon from "@/components/Icons/InfoSquareIcon";

export const StyledFavorites = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "img, svg": {
    width: "20px",
  },
}));
export const ExpandBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));
export const StyledRow = styled("tr")(({ rowColor, theme: { palette } }) => ({
  background: rowColor || "var(--Bar-Bg, #292929)",
  marginTop: "6px",
  marginBottom: "6px",
  display: "table-row",
  tableLayout: "fixed",
  width: "100%",
  ".custom-icon": {
    color: "#fff",
    margin: "0 10px",
    height: "20px",
  },
  ".text-white": {
    color: "#fff",
  },
  "& td:first-child, & td:last-child": {
    boxSizing: "border-box !important",
  },
  "& th:first-child": {
    width: "72px !important",
    minWidth: "72px !important",
    maxWidth: "72px !important",
  },
  "& th:last-child": {
    width: "44px !important",
    minWidth: "44px !important",
    maxWidth: "44px !important",
  },
}));
export const StyledHeader = styled(Box)(({ theme }) => ({
  position: "relative",
}));
export const Title = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  textOverflow: "ellipsis",
  overflow: "hidden",
  a: {
    display: "inline-flex",
  },
}));
export const Cell = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
export const Td = styled("td")(() => ({
  position: "relative",
  boxSizing: "border-box",
  "&:after": {
    content: '" "',
    height: "20px",
    width: "1px",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#ffffff",
  },
}));
export const InfoIcon = styled(InfoSquareIcon)(() => ({
  color: "#fff",
}));
export const InfoButton = styled(IconButton)({
  height: "20px",
  padding: 0,
  svg: {
    width: "15px",
  },
});
export const ToolTipTitle = styled("span")(() => ({
  whiteSpace: "pre-line",
}));
export const PNull = styled("td")({
  textAlign: "center !important",
  opacity: (props) => props.opacity,
});
export const OuterTD = styled("td")({
  textAlign: "center !important",
  padding: "0 !important",
  border: `solid 1px #dba22f`,
});
export const StyledIconButton = styled(IconButton)({
  borderRadius: "5px",
  padding: "0",
  position: "relative",
});
export const StyledLink = styled(Link)({
  color: "#fff",
  fontWeight: "600",
  listStyle: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
});
export const StyledDropDown = styled(Box)(({ theme }) => ({
  background: "#292929",
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: theme.spacing(1.5),
  border: "solid 1px #fff",
  position: "absolute",
  left: "-120px",
  zIndex: "99",
  color: "#fff",
  maxWidth: "300px",
  minWidth: "max-content",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));
export const StyledTable = styled("table")(() => ({
  width: "100%",

  paddingRight: "0 !important",
}));
export const FavIcon = styled(FavoriteIcon)(() => ({
  color: "#EA3A3D",
}));
export const FavOutlinedIcon = styled(FavoriteBorderOutlinedIcon)(() => ({
  color: "#fff",
}));
export const TableHead = styled("th")({
  ".mr-0": {
    marginRight: 0,
  },
});
export const Loader = styled("div")({
  width: "30px",
  height: "30px",
  padding: "auto",
});
export const WhiteBox = styled(Box)({});
export const PriceTableContainer = styled("td")(
  ({ theme: { palette, spacing } }) => ({
    borderBottom: "1px solid white",
    marginRight: spacing(2),
    minWidth: "fit-content",
    padding: "0 15px 0 0",
    "& .outer-table": {
      marginBottom: spacing(2),
      padding: "1rem 0 !important",
      color: "#fff",
      position: "relative",
      ".collapse-icon": {
        cursor: "pointer",
        background: "#696969",
        borderRadius: "5px",
        fontSize: "30px",
      },
    },
    "tr.bordered-row": {
      borderLeft: `1px solid ${palette.secondary.main}`,
      borderRight: `1px solid ${palette.secondary.main}`,
      borderBottom: 0,
    },
    "tr.border-b": {
      borderBottom: `1px solid ${palette.secondary.main} !important`,
    },
    "tr.border-t": {
      borderTop: `1px solid ${palette.secondary.main} !important`,
    },
    "tr.bordered": {
      border: `1px solid ${palette.secondary.main}`,
    },
    "& table": {
      "& th": {
        boxSizing: "border-box",
      },
      "& td": {
        boxSizing: "border-box",
        textAlign: "center",
        padding: "10px 12px",
        fontSize: "12px",
        fontWeight: 600,
      },
    },
  }),
);
export const TimeAgo = styled("span")({
  background: "#696969",
  borderRadius: "5px",
  padding: "3px 5px",
  display: "flex",
  alignItems: "center",
  fontSize: "10px",
});
export const TableHeaderRow = styled("tr")({
  padding: "0 10px",
});
export const Icons = styled("div")({
  boxSizing: "border-box",
});
export const Bidder = styled("td")({
  fontSize: "14px !important",
  fontWeight: "600 !important",
});
export const Price = styled("div")({
  fontSize: "16px !important",
  fontWeight: "700 !important",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
});
export const Th = styled("th")(({ width }) => ({
  padding: "10px 12px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "Outfit",
  width: width,
  "&.title": {
    minWidth: "220px",
    textAlign: "left !important",
    display: "flex",
    alignItems: "center",
    float: "left",
    gap: "12px",
  },
  "&.p-s": {
    paddingLeft: "2px",
    paddingRight: "2px",
    svg: {
      margin: 0,
    },
  },
}));
export const EllipsisCell = styled("div")(({ align }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "calc(100%-44px)",
  textAlign: align || "center",
}));
export const TableCell = styled("td")`
  width: ${(props) => props.width};
  padding: 0 8px;
  text-align: center;
  position: relative;
  font-size: 14px;
  font-family: Outfit;
  font-weight: 500;
  height: 48px;
  vertical-align: middle;
  &.left {
    text-align: left;
    float: left;
    min-width: 220px;
  }
  &.p-s {
    padding-left: 2px;
    padding-right: 2px;
  }
`;

export const FlexCell = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "start",
  maxWidth: "100%",
  height: "100%",
  gap: 24,
  width: "auto",
  " .title-tooltip": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    width: "auto",
    textAlign: "left",
  },
});
export const ViewMore = styled("span")(({ theme: { palette } }) => ({
  fontSize: "8px",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  letterSpacing: 1,
  color: "#fff",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
}));
export const DataSource = styled(Box)({
  textTransform: "capitalize",
});

export const RestrictedIconContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& img": {
    width: "24px",
    height: "24px",
    padding: "4px",
    backgroundColor: "#212121",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
});
