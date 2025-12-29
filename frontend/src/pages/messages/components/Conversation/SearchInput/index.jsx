import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase, IconButton } from "@mui/material";
import { MagnifyingGlass, X } from "phosphor-react";
import { useRef, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  display: "flex",
  alignItems: "center",
  borderRadius: "6px",
  zIndex: 10,
}));

const SearchIconWrapper = styled(Box)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  cursor: "pointer",
  backgroundColor: "transparent",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  position: "absolute",
  left: 0,
  color: "inherit",
  width: "100%",
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.background.overlay, 1)}`,
  backgroundColor: alpha(theme.palette.background.overlay, 1),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "14px",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search messages...",
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (open) {
      return;
    }
    setOpen(true);
    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current.querySelector("input");
        if (input) {
          input.focus();
        }
      }
    }, 50);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    // Keep the input open and focused after clearing
    setTimeout(() => {
      if (inputRef.current) {
        const input = inputRef.current.querySelector("input");
        if (input) {
          input.focus();
        }
      }
    }, 0);
  };

  return (
    <Search>
      <SearchIconWrapper onClick={handleOpen}>
        <MagnifyingGlass size={20} />
      </SearchIconWrapper>
      <StyledInputBase
        ref={inputRef}
        sx={{
          width: open ? "240px" : "40px",
          position: "absolute",
          right: 0,
          zIndex: 1,
          marginLeft: open ? "-214px" : "2px",
          transition: "all 0.3s ease",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        onBlur={handleClose}
        endAdornment={
          value && open ? (
            <IconButton
              size="small"
              onClick={handleClear}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
              sx={{
                padding: "4px",
                marginRight: "30px",
                color: "inherit",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <X size={16} weight="bold" />
            </IconButton>
          ) : null
        }
      />
    </Search>
  );
};

export default SearchInput;
