import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 6,
  border: `1px solid ${theme.palette.background.overlay}`,
  width: "100%",
  color: theme.palette.background.grey,
}));

export default Search;
