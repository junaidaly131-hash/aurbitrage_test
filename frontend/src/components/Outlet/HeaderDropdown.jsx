import React, { useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import DropdownIcon from "@/assets/images/dropdown-icon.svg";
import { useNavigate } from "react-router-dom";

const HeaderDropdown = ({ headerDropdown, handleDropdownClick }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDropdownClick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDropdownClick]);

  return (
    <Box
      className="header-dropdown"
      sx={{ marginRight: "13px", position: "relative" }}
      ref={dropdownRef}
    >
      <IconButton
        onClick={() => handleDropdownClick(!headerDropdown)}
        sx={{
          background: "#696969",
          borderRadius: "5px",
          padding: "5px",
          height: "26px",
          width: "26px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { background: "#696969" },
        }}
      >
        <img loading="lazy" src={DropdownIcon} alt="Dropdown Icon" />
      </IconButton>
      {headerDropdown && (
        <Box
          sx={{
            background: "#292929",
            p: 1,
            mt: 1,
            borderRadius: "12px",
            position: "absolute",
            left: "-10px",
            zIndex: "99",
            color: "#fff",
            width: "max-content",
          }}
        >
          <li
            onClick={() => navigate("/dashboard/profile")}
            style={{ cursor: "pointer", margin: "12px 0" }}
          >
            User Profile
          </li>
          <li
            onClick={() => navigate("/dashboard/help-center")}
            style={{ cursor: "pointer", margin: "12px 0" }}
          >
            Help Center
          </li>
        </Box>
      )}
    </Box>
  );
};

export default HeaderDropdown;
