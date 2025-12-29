import React from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import { Search, AutoFixHigh, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchMetadataContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));

const SearchIcon = styled(Search)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "1.2rem",
}));

const CorrectionIcon = styled(AutoFixHigh)(({ theme }) => ({
  color: theme.palette.warning.main,
  fontSize: "1rem",
}));

const CloseIcon = styled(Close)(({ theme }) => ({
  color: "white",
  fontSize: "1rem",
}));

const SearchMetadataDisplay = ({ searchMetadata, onClose }) => {
  if (!searchMetadata || !searchMetadata.hasCorrections) {
    return null;
  }

  return (
    <SearchMetadataContainer>
      <SearchIcon />
      <Typography variant="body2" sx={{ color: "white" }}>
        Showing results for:
      </Typography>
      <Chip
        label={searchMetadata.correctedQuery || "Corrected query"}
        color="warning"
        variant="outlined"
        size="small"
      />
      {searchMetadata.originalQuery &&
        searchMetadata.originalQuery !== searchMetadata.correctedQuery && (
          <>
            <Typography variant="body2" sx={{ color: "white" }}>
              (instead of "{searchMetadata.originalQuery}")
            </Typography>
          </>
        )}
      {onClose && (
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: "white !important",
            minWidth: "32px",
            width: "32px",
            height: "32px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </SearchMetadataContainer>
  );
};

export default SearchMetadataDisplay;
