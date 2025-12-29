import {
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useSendInviteEmail from "./Hooks/useSentInviteEmail";
import useGetInvitedUsers from "./Hooks/GetAllInvitedUsers";
import useCancelInvite from "./Hooks/useCancelInvite";
import {
  DealerName,
  InputLabel,
  InputWrapper,
  InvitedUsersTable,
  InvitedUsersWrapper,
  SaveBtn,
  SectionWrapper,
  SKUFormField,
  Status,
  StyledHeading,
  Stylediv,
  User,
  UserProfile,
  Wrapper,
} from "./styles";

const AddUsers = () => {
  const [email, setEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const { handleEmailSending, loading, error } = useSendInviteEmail();
  const {
    response,
    loading: cLoading,
    error: cError,
    cancelInvite,
  } = useCancelInvite();
  const {
    invitedUsers,
    loading: getLoading,
    error: getError,
    GetInvitedUsers,
  } = useGetInvitedUsers();

  const prevLoading = useRef(loading);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleUserAddClick = () => {
    if (validateEmail(email)) {
      setEmailError("");
      handleEmailSending(email, receiverName);
    } else {
      setEmailError("Please enter a valid email address");
    }
  };
  const handleCancelInvite = (inviteId) => {
    cancelInvite(inviteId);
  };

  useEffect(() => {
    GetInvitedUsers();
  }, [cLoading]);

  useEffect(() => {
    if (prevLoading.current && !loading) {
      if (error) {
        setSnackbarMessage(error);
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Invite sent successfully");
        setSnackbarSeverity("success");
        GetInvitedUsers();
      }
      setSnackbarOpen(true);
    }
    prevLoading.current = loading;

    if (!loading && !error) {
      setEmail("");
      setReceiverName("");
    }
  }, [loading, error]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stylediv>
      <SectionWrapper>
        <StyledHeading color="#fff">Add User</StyledHeading>
        <Wrapper>
          <InputWrapper>
            <InputLabel>Email Address</InputLabel>
            <SKUFormField
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="enter email address"
              InputProps={{
                disableUnderline: true,
              }}
            />

            {emailError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {emailError}
              </Typography>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Receiver Name</InputLabel>
            <SKUFormField
              variant="standard"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              type="text"
              placeholder="enter reveiver name"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </InputWrapper>
          <SaveBtn
            onClick={handleUserAddClick}
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Add User"
            )}
          </SaveBtn>
        </Wrapper>
      </SectionWrapper>
      <SectionWrapper>
        <StyledHeading color="#fff">Invited Users</StyledHeading>
        {getLoading ? (
          <Box>
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          </Box>
        ) : (
          <>
            <InvitedUsersWrapper hidden="md">
              <InvitedUsersTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invitedUsers.length > 0 ? (
                    invitedUsers.map((user, index) => (
                      <tr key={`row-${index + 1}`}>
                        <td>
                          <UserProfile>{user.name}</UserProfile>
                        </td>
                        <td>
                          <UserProfile>{user.email}</UserProfile>
                        </td>
                        <td>
                          <Status
                            variant="h4"
                            color={
                              user.status === "joined"
                                ? "joined"
                                : user.status === "pending"
                                  ? "pending"
                                  : "rejected"
                            }
                          >
                            {user.status === "joined"
                              ? "Accepted"
                              : user.status === "pending"
                                ? "Pending"
                                : "Rejected"}{" "}
                            {user.status === "joined" && (
                              <IconButton
                                color="primary"
                                onClick={() => handleCancelInvite(user.id)}
                              >
                                <CloseIcon sx={{ color: "#ff0000" }} />{" "}
                              </IconButton>
                            )}
                          </Status>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <UserProfile sx={{ textAlign: "center" }}>
                          No Invited User
                        </UserProfile>
                      </td>
                    </tr>
                  )}
                </tbody>
              </InvitedUsersTable>
            </InvitedUsersWrapper>
            <InvitedUsersWrapper>
              {invitedUsers.length > 0 ? (
                invitedUsers.map((user, index) => (
                  <User key={`mobile-view-${index + 1}`}>
                    <UserProfile>
                      <span>{user.name}</span>
                      <br />
                      <span>{user.email}</span>
                    </UserProfile>
                    <Status
                      variant="h4"
                      color={
                        user.status === "joined"
                          ? "joined"
                          : user.status === "pending"
                            ? "pending"
                            : "rejected"
                      }
                    >
                      {user.status === "joined"
                        ? "Accepted"
                        : user.status === "pending"
                          ? "Pending"
                          : "Rejected"}
                      {user.status === "pending" && (
                        <IconButton
                          color="primary"
                          onClick={() => handleCancelInvite(user.id)}
                        >
                          <CloseIcon sx={{ color: "#ff0000" }} />
                        </IconButton>
                      )}
                    </Status>
                  </User>
                ))
              ) : (
                <td>
                  <UserProfile sx={{ textAlign: "center" }}>
                    No Invited User
                  </UserProfile>
                </td>
              )}
            </InvitedUsersWrapper>
          </>
        )}
      </SectionWrapper>
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
    </Stylediv>
  );
};

export default AddUsers;
