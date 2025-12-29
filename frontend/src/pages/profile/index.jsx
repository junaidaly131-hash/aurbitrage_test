import { useState, useEffect } from "react";
import {
  Grid,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserProfile from "@/components/user-profile/profile";
import ResetPass from "@/components/user-profile/reset-pass";
import AddUsers from "@/components/user-profile/add-users";
import Integration from "@/components/user-profile/integration";
import EmailIntegration from "@/components/user-profile/integration/EmailIntegration";
import SubscriptionManagement from "@/components/user-profile/subscription-management";
import {
  StyledContainer,
  StyledWrapper,
  TabBtn,
  ContentContainer,
  MobileHeader,
  BackBtn,
} from "./styles";
import { CaretRight } from "phosphor-react";

const Profile = () => {
  const [tabs, setTabs] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // On desktop, default to tab 1, on mobile, show tab selection
    if (!isMobile && tabs === null) {
      setTabs(1);
    }
  }, [isMobile, tabs]);

  const handleTabClick = (tabNumber) => {
    setTabs(tabNumber);
  };

  const handleBackToTabs = () => {
    setTabs(null);
  };

  const showTabSelection = isMobile && tabs === null;
  const showContent = isMobile ? tabs !== null : true;

  return (
    <Grid>
      <Grid item xs={12}>
        <StyledContainer>
          {(!isMobile || showTabSelection) && (
            <StyledWrapper
              sx={{
                flexDirection: isMobile ? "column" : "row",
                height: isMobile ? "auto" : "58px",
                gap: isMobile ? "12px" : "12px",
                padding: isMobile ? "12px" : "12px 24px",
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              {isMobile && (
                <Typography variant="h3" sx={{ color: "white" }}>
                  Settings
                </Typography>
              )}
              <TabBtn
                variant={tabs === 1 ? "contained" : "outlined"}
                onClick={() => handleTabClick(1)}
              >
                my Profile {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>
              {/* <TabBtn
                onClick={handleDealerSettingsClick}
                tabs={tabs}
                tabIndex={5}
              >
                Dealear profile
              </TabBtn>
              <TabBtn
                onClick={() => {
                  setTabs(3);
                  handelHelpCenterClick();
                }}
                tabs={tabs}
                tabIndex={3}
              >
                help center
              </TabBtn> */}

              <TabBtn
                onClick={() => handleTabClick(2)}
                variant={tabs === 2 ? "contained" : "outlined"}
              >
                Password Reset{" "}
                {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>
              <TabBtn
                onClick={() => handleTabClick(4)}
                variant={tabs === 4 ? "contained" : "outlined"}
              >
                API Integration{" "}
                {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>
              <TabBtn
                onClick={() => handleTabClick(3)}
                variant={tabs === 3 ? "contained" : "outlined"}
              >
                Add Users {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>

              <TabBtn
                onClick={() => handleTabClick(6)}
                variant={tabs === 6 ? "contained" : "outlined"}
              >
                Email Integrations
                {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>
              <TabBtn
                onClick={() => handleTabClick(7)}
                variant={tabs === 7 ? "contained" : "outlined"}
              >
                Subscription
                {isMobile && <CaretRight size={20} weight="bold" />}
              </TabBtn>
            </StyledWrapper>
          )}

          {showContent && (
            <Grid container>
              <Grid item xs={12}>
                {isMobile && tabs !== null && (
                  <MobileHeader>
                    <BackBtn onClick={handleBackToTabs}>
                      <ArrowBackIcon sx={{ color: "white" }} />
                    </BackBtn>
                    <Typography variant="h4" sx={{ color: "white" }}>
                      {tabs === 1
                        ? "My Profile"
                        : tabs === 2
                          ? "Password Reset"
                          : tabs === 3
                            ? "Add Users"
                            : tabs === 4
                              ? "API Integration"
                              : tabs === 6
                                ? "Email Integrations"
                                : "Subscription"}
                    </Typography>
                  </MobileHeader>
                )}
                <ContentContainer>
                  {tabs === 1 && <UserProfile />}
                  {tabs === 2 && <ResetPass />}

                  {tabs === 3 && <AddUsers />}
                  {tabs === 4 && <Integration />}
                  {tabs === 6 && <EmailIntegration />}
                  {tabs === 7 && <SubscriptionManagement />}
                </ContentContainer>
              </Grid>
            </Grid>
          )}
        </StyledContainer>
      </Grid>
    </Grid>
  );
};

export default Profile;
