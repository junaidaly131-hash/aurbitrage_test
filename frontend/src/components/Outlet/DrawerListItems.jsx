import React, { useCallback, useContext } from "react";
import { Badge, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import useGetAllUnread from "@/pages/messages/hooks/useGetAllUnread";
import {
  BackToMenu,
  ContentWrapper,
  DrawerListContainer,
  FavIcon,
  LogOutBtn,
  LogoutBtnWrapper,
  LogOutText,
  Seprator,
  StyledListItemButton,
  StyledListText,
  ExploreProductsContainer,
  ArrowDown,
  FlexBox,
  MenuIcon,
  Item,
} from "./styles";
import ShortListIcon from "../Icons/ShortListIcon";
import PricingBoardIcon from "../Icons/PricingBoardIcon";
import PostingBoardIcon from "../Icons/PostingBoardIcon";
import ChatIcon from "../Icons/ChatIcon";
import { useAuth } from "@/Context/AuthContext";
import DirectoryIcon from "../Icons/DirectoryIcon";
import { Gear } from "phosphor-react";
import AdminDashboardIcon from "../Icons/AdminDashboardIcon ";
import Sidebar from "@/pages/price-dashboard/components/Sidebar";
import CompassIcon from "../Icons/CompassIcon";
import BoxIcon from "../Icons/BoxIcon";
import ArrowLeftTiltIcon from "../Icons/ArrowLeftTiltIcon";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import DoneIcon from "../Icons/DoneIcon";
import GroupIcon from "../Icons/GroupIcon";
import EmailTemplateIcon from "../Icons/EmailTemplateIcon";
import { NotePencil } from "phosphor-react";
import { useSocketContext } from "@/Context/SocketContext";
import LogoutIcon from "../Icons/LogoutIcon";
const DrawerListItems = ({ navigate, handleDrawerToggle }) => {
  const { fetchAllUnread, unreadCount } = useGetAllUnread();
  const { logout, userRole } = useAuth();
  const { socket } = useSocketContext();
  const location = useLocation();
  const currentRoute = location.pathname;
  React.useEffect(() => {
    if (socket) {
      const handleUpdateChats = () => {
        fetchAllUnread();
      };

      socket.on("UPDATE_CHATS", handleUpdateChats);

      return () => {
        socket.off("UPDATE_CHATS", handleUpdateChats);
      };
    }
  }, [socket]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const items = [
    {
      text: "Messages",
      path: "messages",
      icon: unreadCount ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          color="secondary"
          badgeContent={unreadCount}
        >
          <ChatIcon />
        </Badge>
      ) : (
        <ChatIcon />
      ),
    },

    {
      text: "Posting Board",
      path: "posting-board",
      icon: <PostingBoardIcon />,
      subItems:
        currentRoute === "/dashboard/posting-board" ||
        currentRoute === "/dashboard/posting-board/saved-posts" ||
        currentRoute === "/dashboard/posting-board/my-posts"
          ? [
              {
                text: "My Posts",
                path: "posting-board/my-posts",
                icon: <NotePencil size={24} />,
              },
              {
                text: "Saved Posts",
                path: "posting-board/saved-posts",
                icon: <FavIcon className="fav-icon" />,
              },
            ]
          : [],
    },
    {
      text: "Pricing Dashboard",
      path: "pricing",
      icon: <PricingBoardIcon />,
      subItems:
        currentRoute === "/dashboard/pricing" ||
        currentRoute === "/dashboard/pricing/favorites" ||
        currentRoute === "/dashboard/pricing/shortlist" ||
        currentRoute === "/dashboard/pricing/explore-products" ||
        currentRoute === "/dashboard/pricing/my-skus"
          ? [
              {
                text: "Explore Products",
                path: "pricing/explore-products",
                icon: <CompassIcon />,
              },
              ...(userRole !== "user"
                ? [
                    {
                      text: "My Listings",
                      path: "pricing/my-skus",
                      icon: <BoxIcon />,
                    },
                  ]
                : []),
              {
                text: "Favorites",
                path: "pricing/favorites",
                icon: <FavIcon className="fav-icon" />,
              },
              {
                text: "Quick List",
                path: "pricing/shortlist",
                icon: <ShortListIcon />,
              },
            ]
          : [],
    },
    {
      text: "Directory",
      path: "user-directory",
      icon: <DirectoryIcon fontSize="large" />,
    },
    ...(userRole === "superadmin"
      ? [
          {
            text: "Admin Dashboard",
            path: "/dashboard/settings/catalog",
            icon: <AdminDashboardIcon fontSize="large" />,
            subItems:
              currentRoute === "/dashboard/settings" ||
              currentRoute === "/dashboard/settings/catalog" ||
              currentRoute === "/dashboard/settings/active-skus" ||
              currentRoute === "/dashboard/settings/email-templates" ||
              currentRoute === "/dashboard/settings/user-management"
                ? [
                    {
                      text: "SKU Catalog",
                      path: "settings/catalog",
                      icon: <BoxIcon />,
                    },
                    {
                      text: "Active SKUs",
                      path: "settings/active-skus",
                      icon: <DoneIcon />,
                    },
                    {
                      text: "Users",
                      path: "settings/user-management",
                      icon: <GroupIcon />,
                    },
                    {
                      text: "Email Templates",
                      path: "settings/email-templates",
                      icon: <EmailTemplateIcon />,
                    },
                  ]
                : [],
          },
        ]
      : []),
    {
      text: "Settings",
      path: "profile",
      icon: <Gear size={31} />,
    },
  ];
  const {
    selectedNode,
    isSideBarData,
    sideBarCategories,
    setSelectedNode,
    setCategoryFilter,
    setSubCategoryFilter,
    setMintFilter,
    setIsSideBarData,
    setSkuType,
  } = useContext(PricingDashboardContext);
  const resetDashboardData = () => {
    setSelectedNode("");
    setCategoryFilter("");
    setSubCategoryFilter("");
    setMintFilter("");
    setIsSideBarData(false);
    setSkuType("");
    navigate("/dashboard/pricing");
  };

  return (
    <>
      <DrawerListContainer>
        {currentRoute === "/dashboard/pricing/explore-products" ? (
          <ExploreProductsContainer>
            <BackToMenu onClick={resetDashboardData}>
              <ArrowLeftTiltIcon />
              Back to Main Menu
            </BackToMenu>
            <Sidebar />
          </ExploreProductsContainer>
        ) : (
          items.map(({ text, icon, path, subItems }) => {
            const parent = "/dashboard";
            const activeRoute = currentRoute === `${parent || ""}/${path}`;
            return (
              <React.Fragment key={text}>
                <Item
                  disablePadding
                  onClick={() => {
                    if (!subItems) {
                      handleDrawerToggle();
                    }
                    navigate(path);
                  }}
                >
                  <StyledListItemButton
                    className={`${activeRoute ? `active` : ""}`}
                  >
                    <FlexBox>
                      <MenuIcon>{icon}</MenuIcon>
                      <StyledListText primary={text} />
                    </FlexBox>
                    {subItems && (
                      <ArrowDown rotate={activeRoute ? "rotate" : ""} />
                    )}
                  </StyledListItemButton>
                </Item>
                {subItems && (
                  <Box>
                    {subItems &&
                      subItems.map((subItem) => {
                        const activeSubRoute =
                          currentRoute === `${parent || ""}/${subItem.path}`;

                        return (
                          <Item
                            key={subItem.text}
                            disablePadding
                            onClick={() => navigate(subItem.path)}
                          >
                            <StyledListItemButton
                              className={`${activeSubRoute ? `active` : ""} sub-route`}
                            >
                              <MenuIcon className="sub-item">
                                {subItem.icon}
                              </MenuIcon>
                              <StyledListText primary={subItem.text} />
                            </StyledListItemButton>
                          </Item>
                        );
                      })}
                  </Box>
                )}
              </React.Fragment>
            );
          })
        )}
      </DrawerListContainer>

      <LogoutBtnWrapper>
        <Seprator />
        <ContentWrapper onClick={handleLogout}>
          <LogoutIcon />
          <LogOutText>Sign Out</LogOutText>
        </ContentWrapper>
      </LogoutBtnWrapper>
    </>
  );
};

export default DrawerListItems;
