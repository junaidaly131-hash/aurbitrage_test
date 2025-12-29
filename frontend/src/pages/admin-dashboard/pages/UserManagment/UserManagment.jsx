import React, { useState, useMemo } from "react";
import {
  TableRow,
  TableCell,
  Button,
  Stack,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import VirtualizedTable from "@/components/VirtualizedTable";
import useGetPendingUsers from "../../hooks/useGetPendingUsers";
import useGetPendingDealers from "../../hooks/useGetPendingDealers";
import useActivateUser from "../../hooks/useActiveUser";
import { FilterGroup } from "@/components/FilterGroup";
import ReferenceModal from "./ReferenceModal";
import useGetReferenceResponse from "../../hooks/useGetReferenceResponse";
import useUpdateContributorStatus from "@/pages/admin-dashboard/hooks/useUpdateContributorStatus";
import { useAuth } from "@/Context/AuthContext";
import { SearchBar } from "@/components/SearchBar/SearchFilter";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { faUpRightFromSquare, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import {
  StyledStack,
  HeaderTableCell,
  MapTableCell,
  ActionButton,
  ContributorButton,
  Tab,
  Header,
  Left,
  Right,
  TitleTypography,
  Row,
  P,
} from "./styles";
import SuperadminSubscriptionManagement from "@/components/Dashboard/superadmin-subscription-management.jsx";
import PricelistSharing from "./PricelistSharing";
const UserManagment = () => {
  const { pendingUser, urefetch } = useGetPendingUsers();
  const { pendingDealer, drefetch } = useGetPendingDealers();
  const [searchInput, setSearchInput] = React.useState("");
  const theme = useTheme();
  const {
    loading: updateLoading,
    error: updateError,
    activateUser,
  } = useActivateUser();
  const { updateContributorStatus, error: contributorUpdateError } =
    useUpdateContributorStatus();
  const [statusFilter, setStatusFilter] = React.useState("");
  const [view, setView] = React.useState([]);

  const [tabValue, setTabValue] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [userId, setUserId] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const {
    referenceResponses,
    loading,
    setReferenceNull,
    getReferenceResponse,
  } = useGetReferenceResponse(userId);

  const handleOpenModal = (user_Id) => {
    getReferenceResponse(user_Id);
    setUserId(user_Id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setReferenceNull();
  };
  const handleActivateUser = async (id, userType, status) => {
    await activateUser(id, userType, status);
    if (userType === "user") {
      urefetch();
    } else {
      drefetch();
    }
  };

  const { userRole } = useAuth();
  React.useEffect(() => {
    if (!updateLoading) {
      if (updateError) {
        setSnackbarMessage(updateError);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  }, [updateLoading, updateError]);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  React.useEffect(() => {
    if (tabValue == 0) {
      setView(pendingUser);
    } else {
      setView(pendingDealer);
    }
  }, [pendingDealer, pendingUser, tabValue]);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      keys: tabValue == 1 ? ["dealerName"] : ["email", "firstName"],
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
    };
    let keysArray = [];
    if (tabValue == 1) {
      keysArray = pendingDealer;
    } else {
      keysArray = pendingUser;
    }
    return new Fuse(keysArray, fuseOptions);
  }, [pendingUser, pendingDealer, tabValue]);

  React.useEffect(() => {
    let activeRows = [];
    if (tabValue == 1) {
      activeRows =
        searchInput !== ""
          ? fuse.search(searchInput).map((result) => result.item)
          : pendingDealer;
    } else {
      activeRows =
        searchInput !== ""
          ? fuse.search(searchInput).map((result) => result.item)
          : pendingUser;
    }
    setView(activeRows);
  }, [pendingUser, pendingDealer, searchInput, tabValue]);

  const filterStatusType = (item) => {
    if (statusFilter.length === 0) {
      return true;
    }
    if (
      (statusFilter.includes("pending") && item.status === "pending") ||
      (statusFilter.includes("active") && item.status === "active") ||
      (statusFilter.includes("disabled") && item.status === "disabled")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const viewFilter = (item) => {
    return filterStatusType(item);
  };
  const renderActionButton = (
    row,
    handleActivateUser,
    handleOpenModal,
    userType,
  ) => {
    if (row.status === "active") {
      return (
        <ActionButton
          className="disable"
          variant="contained"
          onClick={() => handleActivateUser(row.id, userType, "disabled")}
          endIcon={<CloseIcon className="icon-red-color" />}
        >
          Disable
        </ActionButton>
      );
    } else if (row.status === "disabled") {
      return (
        <ActionButton
          className="active"
          variant="contained"
          onClick={() => handleActivateUser(row.id, userType, "active")}
          endIcon={<CheckIcon className="icon-green-color" />}
        >
          Enable
        </ActionButton>
      );
    } else if (row.status === "pending") {
      return (
        <>
          <ActionButton
            className="pending-active"
            userType={userType}
            variant="contained"
            onClick={() => handleActivateUser(row.id, userType, "active")}
            endIcon={<CheckIcon className="icon-green-color" />}
          >
            Activate
          </ActionButton>
          <ActionButton
            className="pending-reject"
            variant="contained"
            onClick={() => handleActivateUser(row.id, userType, "disabled")}
            endIcon={<CloseIcon className="icon-red-color" />}
          >
            Reject
          </ActionButton>
        </>
      );
    }

    return null;
  };

  const handleContributorToggle = async (row, state) => {
    const result = window.confirm(
      `Are you sure you want to ${row.contributor ? "disable" : "enable"} contributions from ${row.dealerName}?`,
    );
    if (!result) return;
    await updateContributorStatus(row.id, state);
    if (!contributorUpdateError) {
      setView((p) => {
        const newView = [...p];
        let updatedRow = newView.findIndex((i) => i.id === row.id);
        if (updatedRow !== -1) {
          newView[updatedRow].contributor = state;
        }
        return newView;
      });
    }
  };
  const getActiveOptions = () => {
    let options = [];
    if (tabValue === 0) {
      options = pendingUser?.map((u) => ({
        email: u.email,
        firstName: u.firstName,
      }));
    } else if (tabValue == 1) {
      options = pendingDealer?.map((u) => ({
        dealerName: u.dealerName,
      }));
    }

    return options;
  };
  const renderContributorToggle = (row) => {
    if (row.contributor) {
      return (
        <ContributorButton
          className="contributor-yes"
          variant="contained"
          onClick={() => handleContributorToggle(row, false)}
        >
          Yes
        </ContributorButton>
      );
    } else if (!row.contributor) {
      return (
        <ContributorButton
          className="contributor-no"
          variant="contained"
          onClick={() => handleContributorToggle(row, true)}
        >
          No
        </ContributorButton>
      );
    }

    return null;
  };
  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <StyledStack direction="column" gap={3}>
      <Header>
        <Left>
          <TitleTypography variant="title">User Management</TitleTypography>
          <SearchBar
            searchInput={searchInput}
            onChange={setSearchInput}
            options={getActiveOptions()}
            label={"Search User"}
            isUser={true}
            isDealer={tabValue === 1}
            maxWidth="300px"
          />

          <Tab
            onClick={() => {
              handleTabChange(0);
              setStatusFilter("");
            }}
            isSelected={tabValue === 0}
            variant="outlined"
          >
            Users
          </Tab>

          <Tab
            onClick={() => {
              handleTabChange(1);
              setStatusFilter("");
            }}
            isSelected={tabValue === 1}
            variant="outlined"
          >
            Dealers
          </Tab>

          {userRole === "superadmin" && (
            <>
              <Tab
                onClick={() => {
                  handleTabChange(2);
                  setStatusFilter("");
                }}
                isSelected={tabValue === 2}
                variant="outlined"
              >
                Subscriptions Management
              </Tab>

              <Tab
                onClick={() => {
                  handleTabChange(3);
                  setStatusFilter("");
                }}
                isSelected={tabValue === 3}
                variant="outlined"
              >
                Pricelist Sharing
              </Tab>
            </>
          )}
        </Left>
        <Right>
          <FilterGroup
            options={["active", "pending", "disabled"]}
            filters={statusFilter}
            title="Status"
            onChange={setStatusFilter}
          />
        </Right>
      </Header>

      <ReferenceModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        referenceData={referenceResponses}
        loading={loading}
      />

      {tabValue === 0 && (
        <>
          {pendingUser.length === 0 && <P>No users are pending.</P>}
          {pendingUser.length > 0 && (
            <VirtualizedTable
              data={view.filter(viewFilter)}
              fixedHeaderContent={() => (
                <Row>
                  <HeaderTableCell className="User">First Name</HeaderTableCell>
                  <HeaderTableCell className="User">Last Name</HeaderTableCell>
                  <HeaderTableCell className="User">Email</HeaderTableCell>
                  <HeaderTableCell className="User">Type</HeaderTableCell>
                  <HeaderTableCell className="User">Dealer</HeaderTableCell>
                  <HeaderTableCell className="User">Phone No</HeaderTableCell>
                  <HeaderTableCell className="User">Status</HeaderTableCell>
                  <HeaderTableCell className="User">Action</HeaderTableCell>
                  {userRole === "superadmin" && (
                    <HeaderTableCell className="User">
                      Reference
                    </HeaderTableCell>
                  )}
                </Row>
              )}
              itemContent={(index, row) => {
                let actionButton = renderActionButton(
                  row,
                  handleActivateUser,
                  handleOpenModal,
                  "user",
                );

                return (
                  <>
                    <MapTableCell>{row.firstName}</MapTableCell>
                    <MapTableCell>{row.lastName}</MapTableCell>
                    <MapTableCell>{row.email}</MapTableCell>
                    <MapTableCell>{row.userRole}</MapTableCell>
                    <MapTableCell>{row?.dealer?.dealerName}</MapTableCell>
                    <MapTableCell>{row.phoneNo}</MapTableCell>
                    <MapTableCell>{row.status}</MapTableCell>
                    <MapTableCell>{actionButton}</MapTableCell>
                    {userRole === "superadmin" && (
                      <MapTableCell>
                        <FontAwesomeIcon
                          className="ModalIcon"
                          icon={faUpRightFromSquare}
                          onClick={() => handleOpenModal(row.id)}
                        />
                      </MapTableCell>
                    )}
                  </>
                );
              }}
            />
          )}
        </>
      )}
      {tabValue === 1 && (
        <>
          {pendingDealer.length === 0 && <P>No dealers are pending.</P>}
          {pendingDealer.length > 0 && (
            <VirtualizedTable
              data={view.filter(viewFilter)}
              fixedHeaderContent={() => (
                <Row>
                  <HeaderTableCell className="Dealer">
                    Dealer Name
                  </HeaderTableCell>
                  <HeaderTableCell className="Dealer">Status</HeaderTableCell>
                  <HeaderTableCell className="Dealer">Action</HeaderTableCell>
                  <HeaderTableCell className="Dealer">
                    Contributor
                  </HeaderTableCell>
                </Row>
              )}
              itemContent={(index, row) => {
                let actionButton = renderActionButton(
                  row,
                  handleActivateUser,
                  handleOpenModal,
                  "dealer",
                );
                let contributorToggle = renderContributorToggle(row);
                return (
                  <>
                    <MapTableCell>{row.dealerName}</MapTableCell>
                    <MapTableCell>{row.status}</MapTableCell>
                    <MapTableCell>{actionButton}</MapTableCell>
                    <MapTableCell>{contributorToggle}</MapTableCell>
                  </>
                );
              }}
            />
          )}
        </>
      )}
      {tabValue === 2 && userRole === "superadmin" && (
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <SuperadminSubscriptionManagement />
        </Box>
      )}
      {tabValue === 3 && userRole === "superadmin" && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <PricelistSharing />
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledStack>
  );
};

export default UserManagment;
