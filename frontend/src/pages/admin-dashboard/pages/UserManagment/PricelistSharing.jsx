import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Collapse,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Search, ExpandMore, ExpandLess } from "@mui/icons-material";
import useDealerPricelistShare from "../../hooks/useDealerPricelistShare";
import { Header, Left, Right } from "./styles";

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.overlay,
  borderRadius: theme.spacing(1),
  height: "100%",
  width: "100%",
  overflow: "auto",
  minHeight: "100%",
  minWidth: "100%",
}));

const DealerRow = styled(Paper)(({ theme }) => ({
  backgroundColor: "#292929",
  color: "#fff",
  marginBottom: theme.spacing(1),
  borderRadius: theme.spacing(1),
  border: "1px solid #444",
  overflow: "hidden",
  width: "100%",
}));

const RowHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const DealerInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));

const DealerName = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: 600,
  fontSize: "16px",
}));

const DealerSubtext = styled(Typography)(({ theme }) => ({
  color: "#999",
  fontSize: "14px",
  marginTop: theme.spacing(0.5),
}));

const ExpansionIcon = styled(Box)(({ theme }) => ({
  color: "#ccc",
  display: "flex",
  alignItems: "center",
}));

const ExpandedContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#1a1a1a",
  borderTop: "1px solid #444",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: 600,
  fontSize: "16px",
  marginBottom: theme.spacing(1),
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  color: "#999",
  fontSize: "14px",
  marginBottom: theme.spacing(2),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomSearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#292929",
    color: "#fff",
    borderRadius: theme.spacing(1),
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    "& input": {
      color: "#fff",
      "&::placeholder": {
        color: "#666",
      },
    },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: "#666",
  },
}));

const DealersContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  border: "1px solid #444",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  maxHeight: "300px",
  overflowY: "auto",
  marginBottom: theme.spacing(2),
}));

const DealerCheckboxItem = styled(FormControlLabel)(({ theme }) => ({
  color: "#fff",
  margin: theme.spacing(0.5, 0),
  width: "100%",
  justifyContent: "space-between",
  marginRight: 0,
  "& .MuiCheckbox-root": {
    color: "#666",
    "&.Mui-checked": {
      color: theme.palette.secondary.main,
    },
  },
  "& .MuiFormControlLabel-label": {
    color: "#fff",
    fontSize: "14px",
    flex: 1,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#000",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontSize: "14px",
  marginRight: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  "&:disabled": {
    backgroundColor: "#444",
    color: "#666",
  },
}));

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4b1818",
  color: "#fff",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#5a1f1f",
  },
  "&:disabled": {
    backgroundColor: "#444",
    color: "#666",
  },
}));

const SelectedDealersBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#293a1a",
  border: "1px solid #444",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SelectedDealerChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#000",
  fontSize: "12px",
  height: "28px",
  margin: theme.spacing(0.5),
  "& .MuiChip-deleteIcon": {
    color: "#000",
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  color: "#666",
}));

const PricelistSharing = () => {
  const theme = useTheme();
  const {
    loading,
    error,
    sendingDealers,
    allDealers,
    sharingConfig,
    fetchSendingDealers,
    fetchAllDealers,
    fetchSharingConfig,
    configureSharing,
    removeSharing,
  } = useDealerPricelistShare();

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedViewers, setSelectedViewers] = useState({});
  const [originalViewers, setOriginalViewers] = useState({}); // Track original state from DB
  const [hasChanges, setHasChanges] = useState({});
  const [saveLoading, setSaveLoading] = useState({});
  const [rowLoading, setRowLoading] = useState({}); // Track which rows are loading sharing config
  const [sharingConfigs, setSharingConfigs] = useState({}); // Store config for each dealer: { dealerId: [...viewerIds] }
  const [initialLoading, setInitialLoading] = useState(true); // Track initial page load only

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchSendingDealers();
        await fetchAllDealers();
      } finally {
        setInitialLoading(false);
      }
    };
    initializeData();
  }, []);

  const fetchSharingConfigForDealer = async (dealerId) => {
    try {
      setRowLoading((prev) => ({ ...prev, [dealerId]: true }));
      await fetchSharingConfig(dealerId);
    } catch (err) {
      console.error("Error fetching sharing config for dealer:", dealerId, err);
    } finally {
      setRowLoading((prev) => ({ ...prev, [dealerId]: false }));
    }
  };

  const toggleRowExpansion = async (dealerId) => {
    const newExpandedRows = new Set(expandedRows);

    if (expandedRows.has(dealerId)) {
      newExpandedRows.delete(dealerId);
      setExpandedRows(newExpandedRows);
    } else {
      newExpandedRows.add(dealerId);
      setExpandedRows(newExpandedRows);
      // Fetch sharing config when expanding
      if (!selectedViewers[dealerId]) {
        await fetchSharingConfigForDealer(dealerId);
      }
    }
  };

  // Update when sharingConfig changes - this contains data for the last fetched dealer
  useEffect(() => {
    if (sharingConfig.length > 0) {
      console.log("Processing sharingConfig:", sharingConfig);

      // Find the dealer this config belongs to by looking for a dealer not in the config
      // The config contains all OTHER dealers (not the sender dealer itself)
      const possibleSenderIds = sendingDealers.map((d) => d.id);
      const configDealerIds = sharingConfig.map((c) => c.id);

      // Find which sending dealer is NOT in the config list (that's the sender)
      let senderDealerId = null;
      for (const dealerId of possibleSenderIds) {
        if (!configDealerIds.includes(dealerId)) {
          senderDealerId = dealerId;
          break;
        }
      }

      if (senderDealerId) {
        console.log(
          `Processed sharing config for sender dealer ${senderDealerId}`,
        );

        // Extract viewer IDs (dealers who can view this sender's pricelists)
        const viewerIds = sharingConfig
          .filter((config) => config.canView)
          .map((config) => config.id);

        console.log(`Viewer IDs for dealer ${senderDealerId}:`, viewerIds);

        // Store this config
        setSharingConfigs((prev) => ({
          ...prev,
          [senderDealerId]: viewerIds,
        }));

        // Update selected viewers for this dealer
        setSelectedViewers((prev) => ({
          ...prev,
          [senderDealerId]: viewerIds,
        }));

        // Store original viewers for change detection
        setOriginalViewers((prev) => ({
          ...prev,
          [senderDealerId]: viewerIds,
        }));

        // Mark as no changes initially
        setHasChanges((prev) => ({
          ...prev,
          [senderDealerId]: false,
        }));
      }
    }
  }, [sharingConfig, sendingDealers]);

  const handleViewerToggle = (dealerId, viewerId) => {
    const newViewers = selectedViewers[dealerId]?.includes(viewerId)
      ? selectedViewers[dealerId].filter((id) => id !== viewerId)
      : [...(selectedViewers[dealerId] || []), viewerId];

    setSelectedViewers((prev) => ({
      ...prev,
      [dealerId]: newViewers,
    }));

    // Check if there are actual changes compared to original
    const original = originalViewers[dealerId] || [];
    const hasActualChanges =
      newViewers.length !== original.length ||
      !newViewers.every((id) => original.includes(id));

    setHasChanges((prev) => ({
      ...prev,
      [dealerId]: hasActualChanges,
    }));
  };

  const handleSaveConfiguration = async (dealerId) => {
    try {
      setSaveLoading((prev) => ({ ...prev, [dealerId]: true }));

      await configureSharing(dealerId, selectedViewers[dealerId] || []);

      // Update original viewers after successful save
      setOriginalViewers((prev) => ({
        ...prev,
        [dealerId]: selectedViewers[dealerId] || [],
      }));

      setHasChanges((prev) => ({ ...prev, [dealerId]: false }));

      // Update sharing configs
      setSharingConfigs((prev) => ({
        ...prev,
        [dealerId]: selectedViewers[dealerId] || [],
      }));

      await fetchSharingConfig(dealerId);

      // Refresh sending dealers to get updated counts
      await fetchSendingDealers();

      console.log("Configuration saved successfully!");
    } catch (err) {
      console.error("Error saving configuration:", err.message);
    } finally {
      setSaveLoading((prev) => ({ ...prev, [dealerId]: false }));
    }
  };

  const handleRemoveAllSharing = async (dealerId, dealerName) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove all sharing permissions for ${dealerName}?`,
    );

    if (!confirmed) return;

    try {
      setSaveLoading((prev) => ({ ...prev, [dealerId]: true }));

      await removeSharing(dealerId);

      setSelectedViewers((prev) => ({
        ...prev,
        [dealerId]: [],
      }));

      setOriginalViewers((prev) => ({
        ...prev,
        [dealerId]: [],
      }));

      setSharingConfigs((prev) => ({
        ...prev,
        [dealerId]: [],
      }));

      setHasChanges((prev) => ({ ...prev, [dealerId]: false }));
      await fetchSharingConfig(dealerId);

      // Refresh sending dealers to get updated counts
      await fetchSendingDealers();

      console.log("All sharing permissions removed successfully!");
    } catch (err) {
      console.error("Error removing sharing:", err.message);
    } finally {
      setSaveLoading((prev) => ({ ...prev, [dealerId]: false }));
    }
  };

  const getFilteredDealers = (currentDealerId) => {
    const filtered = allDealers.filter((dealer) =>
      dealer.dealerName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort: shared dealers first, then alphabetical
    return filtered.sort((a, b) => {
      const aIsShared =
        selectedViewers[currentDealerId]?.includes(a.id) || false;
      const bIsShared =
        selectedViewers[currentDealerId]?.includes(b.id) || false;

      if (aIsShared && !bIsShared) return -1;
      if (!aIsShared && bIsShared) return 1;
      return a.dealerName.localeCompare(b.dealerName);
    });
  };

  return (
    <StyledContainer>
      <Header>
        <Left>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
            Pricelist Sharing Configuration
          </Typography>
        </Left>
        <Right>{/* Additional header actions can be added here */}</Right>
      </Header>

      {error && (
        <Alert
          severity="error"
          sx={{ margin: 2, backgroundColor: "#4b1818", color: "#fff" }}
        >
          {error}
        </Alert>
      )}

      {initialLoading ? (
        <Box display="flex" justifyContent="center" padding={4}>
          <CircularProgress sx={{ color: theme.palette.secondary.main }} />
          <Typography sx={{ marginLeft: 2, color: "#fff" }}>
            Loading dealers...
          </Typography>
        </Box>
      ) : sendingDealers.length === 0 ? (
        <EmptyState>
          <Typography variant="h6" color="#666">
            No dealers are currently sending pricelists.
          </Typography>
        </EmptyState>
      ) : (
        <Box p={2}>
          {sendingDealers.map((dealer) => (
            <DealerRow key={dealer.id}>
              <RowHeader onClick={() => toggleRowExpansion(dealer.id)}>
                <DealerInfo>
                  <DealerName>{dealer.dealerName}</DealerName>
                  <DealerSubtext>
                    Receiving from {parseInt(dealer.receivingFromCount) || 0}{" "}
                    dealer
                    {(parseInt(dealer.receivingFromCount) || 0) !== 1
                      ? "s"
                      : ""}{" "}
                    • Shared with {parseInt(dealer.sharedWithCount) || 0} dealer
                    {(parseInt(dealer.sharedWithCount) || 0) !== 1 ? "s" : ""}
                  </DealerSubtext>
                </DealerInfo>
                <ExpansionIcon>
                  {expandedRows.has(dealer.id) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ExpansionIcon>
              </RowHeader>

              <Collapse
                in={expandedRows.has(dealer.id)}
                timeout="auto"
                unmountOnExit
              >
                <ExpandedContent>
                  {rowLoading[dealer.id] ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      padding={4}
                    >
                      <CircularProgress
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      <Typography sx={{ marginLeft: 2, color: "#fff" }}>
                        Loading sharing configuration...
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <SectionTitle>Configure Sharing Permissions</SectionTitle>
                      <SectionDescription>
                        Select which dealers can view {dealer.dealerName}'s
                        pricelists.
                      </SectionDescription>

                      <SearchContainer>
                        <CustomSearchField
                          fullWidth
                          placeholder="Search dealers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </SearchContainer>

                      <DealersContainer>
                        {getFilteredDealers(dealer.id)
                          .filter(
                            (dealerOption) => dealerOption.id !== dealer.id,
                          )
                          .map((dealerOption) => (
                            <DealerCheckboxItem
                              key={dealerOption.id}
                              control={
                                <Checkbox
                                  checked={(
                                    selectedViewers[dealer.id] || []
                                  ).includes(dealerOption.id)}
                                  onChange={() =>
                                    handleViewerToggle(
                                      dealer.id,
                                      dealerOption.id,
                                    )
                                  }
                                  disabled={saveLoading[dealer.id]}
                                />
                              }
                              label={dealerOption.dealerName}
                            />
                          ))}
                      </DealersContainer>

                      {(selectedViewers[dealer.id] || []).length > 0 && (
                        <SelectedDealersBox>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "14px",
                              marginBottom: 1,
                            }}
                          >
                            Selected Dealers (
                            {(selectedViewers[dealer.id] || []).length}):
                          </Typography>
                          <Box>
                            {(selectedViewers[dealer.id] || []).map(
                              (viewerId) => {
                                const dealerName = allDealers.find(
                                  (d) => d.id === viewerId,
                                )?.dealerName;
                                return (
                                  <SelectedDealerChip
                                    key={viewerId}
                                    label={dealerName}
                                    size="small"
                                    onDelete={() =>
                                      handleViewerToggle(dealer.id, viewerId)
                                    }
                                  />
                                );
                              },
                            )}
                          </Box>
                        </SelectedDealersBox>
                      )}

                      <Box display="flex" justifyContent="flex-start">
                        <ActionButton
                          onClick={() => handleSaveConfiguration(dealer.id)}
                          disabled={
                            !hasChanges[dealer.id] || saveLoading[dealer.id]
                          }
                          startIcon={
                            saveLoading[dealer.id] && (
                              <CircularProgress
                                size={16}
                                sx={{ color: "#000" }}
                              />
                            )
                          }
                        >
                          {saveLoading[dealer.id]
                            ? "Saving..."
                            : "Save Configuration"}
                        </ActionButton>

                        <DangerButton
                          onClick={() =>
                            handleRemoveAllSharing(dealer.id, dealer.dealerName)
                          }
                          disabled={
                            (selectedViewers[dealer.id] || []).length === 0 ||
                            saveLoading[dealer.id]
                          }
                          startIcon={
                            saveLoading[dealer.id] && (
                              <CircularProgress
                                size={16}
                                sx={{ color: "#fff" }}
                              />
                            )
                          }
                        >
                          Remove All Sharing
                        </DangerButton>
                      </Box>

                      {!hasChanges[dealer.id] && (
                        <Alert
                          severity="info"
                          sx={{
                            marginTop: 2,
                            backgroundColor: "#1a4a6a",
                            color: "#fff",
                          }}
                        >
                          No changes to save
                        </Alert>
                      )}
                    </>
                  )}
                </ExpandedContent>
              </Collapse>
            </DealerRow>
          ))}
        </Box>
      )}
    </StyledContainer>
  );
};

export default PricelistSharing;
