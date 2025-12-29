import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { useAuth } from "@/Context/AuthContext";
import { Connect, Input, ToggleIcon } from "./styles";

const ApiIntegration = ({
  integrationName,
  tokenKey,
  validateHook,
  addHook,
  removeHook,
  apiToken,
  setUserApiKey,
}) => {
  const { storageType } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    setIsStoneXIntegrated,
    setIsDillionGageIntegrated,
    setIsUpstateIntegrated,
  } = useContext(PricingDashboardContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const {
    validateToken,
    loading: validateLoading,
    ValidateToken,
  } = validateHook();

  const { loading: addTokenLoading, addToken } = addHook();
  const { loading: removeLoading, deleteToken } = removeHook();

  const [integrationLoading, setIntegrationLoading] = useState(false);

  const isExistingIntegration =
    apiToken !== null && apiToken !== "undefined" && apiToken !== "";

  const handleSnackbarMessage = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (integrationName.toLowerCase() === "upstate") {
      setEmail(apiToken || "");
      setPassword("");
    } else {
      setApiKey(apiToken);
    }
  }, [apiToken, integrationName]);

  useEffect(() => {
    const handleValidationSuccess = async () => {
      if (validateLoading === "success") {
        if (validateToken?.valid) {
          try {
            const credentials =
              integrationName.toLowerCase() === "upstate"
                ? { email, password }
                : apiKey;
            await addToken(credentials, integrationName);
            handleSnackbarMessage(
              `Integration ${isExistingIntegration ? "updated" : "added"} successfully.`,
              "success",
            );
            storageType.setItem(`is${integrationName}Integrated`, "true");

            setUserApiKey((prev) => ({
              ...prev,
              [tokenKey]:
                integrationName.toLowerCase() === "upstate" ? email : apiKey,
              ...(integrationName.toLowerCase() === "upstate" && {
                upstatePassword: password,
              }),
            }));
            if (integrationName === "StoneX") {
              setIsStoneXIntegrated(true);
            }
            if (integrationName === "DillionGage") {
              setIsDillionGageIntegrated(true);
            }
            if (integrationName.toLowerCase() === "upstate") {
              setIsUpstateIntegrated(true);
            }
          } catch (error) {
            console.error("Error Updating/Adding Integration:", error);
            handleSnackbarMessage("Update failed.", "error");
          }
        } else {
          handleSnackbarMessage(
            validateToken?.message || "Token validation failed",
            "error",
          );
        }
      }
    };
    handleValidationSuccess();
  }, [validateLoading]);

  useEffect(() => {
    if (removeLoading === "success") {
      storageType.setItem(`is${integrationName}Integrated`, "false");

      setUserApiKey((prev) => ({
        ...prev,
        [tokenKey]: "",
        ...(integrationName.toLowerCase() === "upstate" && {
          upstatePassword: "",
        }),
      }));
      if (integrationName.toLowerCase() === "upstate") {
        setEmail("");
        setPassword("");
      } else {
        setApiKey("");
      }

      if (integrationName === "StoneX") {
        setIsStoneXIntegrated(false);
      }
      if (integrationName === "DillionGage") {
        setIsDillionGageIntegrated(false);
      }
      if (integrationName === "Upstate") {
        setIsUpstateIntegrated(false);
      }

      handleSnackbarMessage(
        `${integrationName} Integration Removed.`,
        "success",
      );
    } else if (removeLoading === "failed") {
      handleSnackbarMessage("Failed To Remove Token.", "error");
    }
  }, [removeLoading]);

  const toggleShowApiKey = () => setShowApiKey((prev) => !prev);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleUpdateProfile = async () => {
    setIntegrationLoading(true);
    try {
      const credentials =
        integrationName.toLowerCase() === "upstate"
          ? { email, password }
          : apiKey;
      await ValidateToken(integrationName, credentials);
    } catch (error) {
      console.error("Validation error:", error);
      handleSnackbarMessage("Validation failed.", "error");
    } finally {
      setIntegrationLoading(false);
    }
  };

  const handleRemoveIntegration = async () => {
    await deleteToken(integrationName);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {integrationName.toLowerCase() === "upstate" ? (
        <>
          <Input
            placeholder="Please enter email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Please enter password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <ToggleIcon onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </ToggleIcon>
              ),
            }}
          />
        </>
      ) : (
        <Input
          placeholder="Please enter API Key"
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type={showApiKey ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <ToggleIcon onClick={toggleShowApiKey}>
                {showApiKey ? <VisibilityOff /> : <Visibility />}
              </ToggleIcon>
            ),
          }}
        />
      )}
      <Connect onClick={handleUpdateProfile} variant="contained">
        {integrationLoading || addTokenLoading === "loading" ? (
          <CircularProgress size={24} color="inherit" />
        ) : isExistingIntegration ? (
          "Update"
        ) : (
          "Connect"
        )}
      </Connect>

      {isExistingIntegration && (
        <Connect
          danger
          onClick={handleRemoveIntegration}
          disabled={removeLoading === "loading"}
        >
          {removeLoading === "loading" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Remove"
          )}
        </Connect>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ApiIntegration;
