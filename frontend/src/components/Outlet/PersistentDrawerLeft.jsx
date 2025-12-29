import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline, IconButton, useMediaQuery } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import Logo from "@/assets/images/logo.svg";
import { useAuth } from "@/Context/AuthContext";
import { useSpotPrices } from "@/Context/SpotPricesContext";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";
import DrawerHeader from "./DrawerHeader";
import SpotPrices from "./SpotPrices";
import DrawerListItems from "./DrawerListItems";
import { useTheme } from "@mui/material/styles";

import {
  Main,
  Wrapper,
  StyledDrawer,
  StyledAvatar,
  AvatarOuterBox,
  AvatarInnerBox,
  SiderbarHeaderBox,
  StyledToolbar,
  SpotPricesWrapper,
  StyledText,
  StyledUserText,
  Seprator,
  StyledWrapperv2,
  LogoImg,
  Content,
  StyledIconButton,
  HeaderIconsBox,
  NotificationCounter,
} from "./styles";
import { useLayout } from "@/Context/LayoutContext";
import SubscriptionBadge from "../SubscriptionBadge";
import NotificationIcon from "../Icons/NotificationIcon";
import { useSocketContext } from "@/Context/SocketContext";
import { useNotifications } from "@/Context";

const drawerWidth = 300;
const mediaQueryWidth = 1400;

const PersistentDrawerLeft = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout();
  const navigate = useNavigate();
  const { spotPrices } = useSpotPrices();
  const { socket } = useSocketContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { userName, dealerName, profileImage: profilePic } = useAuth();
  const { totalItemsUnread, refreshNotifications } = useNotifications();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (profilePic != null) {
      setProfileImage(profilePic);
    }
  }, [profilePic]);

  const handleDrawerToggle = useCallback(() => {
    toggleSidebar(!isSidebarOpen);
  }, [isSidebarOpen, toggleSidebar]);

  useEffect(() => {
    const handleResize = () => {
      toggleSidebar(window.innerWidth > mediaQueryWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleSidebar]);

  React.useEffect(() => {
    if (socket) {
      socket.on("push_notification", () => {
        refreshNotifications();
      });
      return () => socket.removeAllListeners("push_notification");
    }
  }, [socket, refreshNotifications]);

  const unReadNotification = totalItemsUnread;
  return (
    <Wrapper>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ background: "#000", color: "#fff", pt: "8px" }}
        open={isSidebarOpen}
        drawerWidth={drawerWidth}
      >
        {isMobile && (
          <StyledToolbar>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <LogoImg
                loading="lazy"
                src={Logo}
                alt="Logo"
                style={{ width: "120px" }}
              />
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                mr: 2,
                color: "white",
              }}
            >
              <MenuIcon />
            </IconButton>
          </StyledToolbar>
        )}
        <StyledToolbar fullWidth={isMobile}>
          {!isMobile && !isSidebarOpen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                mr: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <SpotPricesWrapper>
            <SpotPrices spotPrices={spotPrices} />
          </SpotPricesWrapper>
        </StyledToolbar>
      </AppBar>
      <StyledDrawer
        drawerWidth={drawerWidth}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isSidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            justifyContent: "flex-start",
            border: "none",
            py: 3,
            px: 3,
          }}
        >
          {isSidebarOpen && (
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <LogoImg
                  loading="lazy"
                  src={Logo}
                  alt="Logo"
                  style={{ width: isMobile ? "120px" : "156px" }}
                />
              </Box>
              {!isMobile && (
                <>
                  <HeaderIconsBox
                    onClick={() => navigate("/dashboard/notifications")}
                  >
                    <NotificationIcon />
                    {unReadNotification > 0 && (
                      <NotificationCounter>
                        {unReadNotification}
                      </NotificationCounter>
                    )}
                  </HeaderIconsBox>
                  <ChevronLeftIcon
                    sx={{ ml: "4px", color: "white" }}
                    onClick={handleDrawerToggle}
                  />
                </>
              )}
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: "white",
                    padding: "8px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Box>

        <SiderbarHeaderBox className="sidebar-header">
          <Box className="sidebar-header-items">
            <Box sx={{ position: "relative" }}>
              <StyledAvatar
                src={profileImage || undefined}
                alt="Avatar"
              ></StyledAvatar>
              <AvatarOuterBox>
                <AvatarInnerBox />
              </AvatarOuterBox>
            </Box>
          </Box>
          <Box>
            <StyledText>{userName}</StyledText>
            <StyledUserText>{dealerName}</StyledUserText>
          </Box>
        </SiderbarHeaderBox>
        <SubscriptionBadge />
        <DrawerListItems
          navigate={navigate}
          handleDrawerToggle={() => isMobile && handleDrawerToggle()}
        />
      </StyledDrawer>
      <Main open={isSidebarOpen} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Wrapper>
  );
};

export default React.memo(PersistentDrawerLeft);
