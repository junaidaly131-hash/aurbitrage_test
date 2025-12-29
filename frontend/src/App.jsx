import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "@/Theme";
import { AuthProvider } from "./Context/AuthContext";
import { SubscriptionProvider } from "./Context/SubscriptionContext";
import { styled } from "@mui/system";
import { Box, CssBaseline, LinearProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { lazy, Suspense } from "react";
import { LoadScript } from "@react-google-maps/api";

// Lazy load components
const AdminDashboard = lazy(() => import("./pages/admin-dashboard"));

const LoginPage = lazy(() => import("./Login/login"));
const RegisterPage = lazy(() => import("./Register/RegisterPage"));
const FeedbackPage = lazy(() => import("./reference_confirmation/feedback"));
const ResetPassword = lazy(() => import("./Login/reset-password"));
const LandingPage = lazy(() => import("./pages/landing-page"));
const AboutPage = lazy(() => import("./pages/landing-page/about"));
const ErrorPage = lazy(() => import("./pages/landing-page/404"));
const PriceDashboard = lazy(() => import("./pages/price-dashboard"));
const Messages = lazy(() => import("./pages/messages"));
const NewPostingBoard = lazy(() => import("./pages/posting-board"));
const SidePanel = lazy(() => import("@/components/Outlet"));
import InviteRegistrationPage from "./Register/inviteRegistration";
const Profile = lazy(() => import("./pages/profile"));
const DemoPage = lazy(() => import("./pages/landing-page/Demo"));
const FAQsPage = lazy(() => import("./pages/landing-page/FAQs"));
const HelpCenter = lazy(() => import("./pages/help-center"));
const UserDirectory = lazy(() => import("./pages/user-directory"));
const PaymentSuccessPage = lazy(() => import("./pages/payment/success"));
const PaymentErrorPage = lazy(() => import("./pages/payment/error"));
const PaymentManagementPage = lazy(() => import("./pages/payment-management"));
import ProtectedRoute from "./components/ProtectedRoute";
import SubscriptionProtectedRoute from "./components/SubscriptionProtectedRoute";

import { PricingDashboardProvider } from "@/Context/PricingDashboardContext";
import { PostingBoardProvider } from "@/Context/PostingBoardContext";
import { SpotPricesProvider } from "./Context/SpotPricesContext";
import { SocketProvider } from "./Context/SocketContext";
import { store } from "./redux/store";
import { LayoutProvider } from "./Context/LayoutContext";
import Notifications from "./pages/Notifications";
import { NotificationsProvider } from "./Context/NotificationsContext";
import MySKUs from "./pages/MySKUs";
import Users from "./pages/admin-dashboard/pages/UserManagment/UserManagment";
import ActiveSKUs from "./pages/ActiveSKUs";
import CatalogSKUs from "./pages/CatalogSKUs";
import EmailTemplatePreviewPage from "./pages/EmailTemplatePreview/EmailTemplatePreviewPage";

const StyledDiv = styled("div")(({ theme }) => ({
  minWidth: "80vw",
  minHeight: "80vh",
  color: theme.typography.color.primary,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4),
}));

const ProtectedAdminDashboard = ProtectedRoute(AdminDashboard);
const ProtectedUsers = ProtectedRoute(Users);
const ProtectedActiveSKUs = ProtectedRoute(ActiveSKUs);
const ProtectedCatalogSKUs = ProtectedRoute(CatalogSKUs);
const ProtectedMessages = ProtectedRoute(Messages);
const ProtectedPostingBoard = ProtectedRoute(NewPostingBoard);
const ProtectedProfile = ProtectedRoute(Profile);
const ProtectedSidePanel = ProtectedRoute(SidePanel);
const ProtectedNotifications = ProtectedRoute(Notifications);
const ProtectedPaymentManagement = ProtectedRoute(PaymentManagementPage);
const ProtectedEmailTemplatePreview = ProtectedRoute(EmailTemplatePreviewPage);

// Subscription-protected routes (require active subscription)
const SubscriptionProtectedPriceDashboard = SubscriptionProtectedRoute(
  PriceDashboard,
  true,
);
const SubscriptionProtectedMySKUs = SubscriptionProtectedRoute(MySKUs, true);

const LoadingMessage = (
  <StyledDiv>
    <div style={{ width: "70vw", margin: "30vh auto", textAlign: "center" }}>
      <LinearProgress />
    </div>
  </StyledDiv>
);

function AppRouter() {
  const isLoading = false;
  const isAuthenticated = true;

  return (
    <ThemeProvider theme={Theme}>
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "bottom-center",
          style: {
            background: "#F6FCF5",
            color: "#006B18",
            border: "2px solid #E4ECE0000",
          },
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 2000,
            style: {
              background: "#8a8a8a",
              color: "#fff",
              border: "2px solid #E4ECE0000",
            },
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <LayoutProvider>
        <Box>
          <CssBaseline />
          {isLoading || !isAuthenticated ? (
            <StyledDiv>
              <div
                style={{
                  width: "70vw",
                  margin: "30vh auto",
                  textAlign: "center",
                }}
              >
                <h2>Welcome to Aurbitrage!</h2>
                <LinearProgress />
              </div>
            </StyledDiv>
          ) : (
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/register"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/invite-registration/:inviteId"
                element={<InviteRegistrationPage />}
              />
              <Route
                exact
                path="/userfeedback/:refId"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <FeedbackPage />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/reset-password/:token"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <ResetPassword />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/admin-dashboard"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <ProtectedAdminDashboard />
                  </Suspense>
                }
              />
              <Route path="*" element={<ErrorPage />} />

              {/* Landing Page Routes */}
              <Route
                exact
                path="/"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <LandingPage />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/About"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <AboutPage />
                  </Suspense>
                }
              />

              <Route
                exact
                path="/demo"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <DemoPage />
                  </Suspense>
                }
              />

              <Route
                exact
                path="/faqs"
                element={
                  <Suspense fallback={LoadingMessage}>
                    <FAQsPage />
                  </Suspense>
                }
              />
              {/* Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <SpotPricesProvider>
                    <PricingDashboardProvider>
                      <Suspense fallback={LoadingMessage}>
                        <ProtectedSidePanel />
                      </Suspense>
                    </PricingDashboardProvider>
                  </SpotPricesProvider>
                }
              >
                {/* Default route - redirect to pricing dashboard */}
                <Route
                  index
                  element={<Navigate to="/dashboard/pricing/" replace />}
                />
                <Route
                  path="pricing/"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <SubscriptionProtectedPriceDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="pricing/favorites"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <SubscriptionProtectedPriceDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="pricing/explore-products"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <SubscriptionProtectedPriceDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="pricing/my-skus"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <SubscriptionProtectedMySKUs />
                    </Suspense>
                  }
                />
                <Route
                  path="pricing/shortlist"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <SubscriptionProtectedPriceDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedMessages />
                    </Suspense>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedProfile />
                    </Suspense>
                  }
                />
                <Route
                  path="help-center"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <HelpCenter />
                    </Suspense>
                  }
                />
                <Route
                  path="user-directory"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <UserDirectory />
                    </Suspense>
                  }
                />
                <Route
                  path="payment/success"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <PaymentSuccessPage />
                    </Suspense>
                  }
                />
                <Route
                  path="payment/error"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <PaymentErrorPage />
                    </Suspense>
                  }
                />
                <Route
                  path="payment-management"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedPaymentManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedAdminDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="settings/my-skus"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedAdminDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="settings/catalog"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedCatalogSKUs />
                    </Suspense>
                  }
                />
                <Route
                  path="settings/active-skus"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedActiveSKUs />
                    </Suspense>
                  }
                />
                <Route
                  path="settings/user-management"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedUsers />
                    </Suspense>
                  }
                />
                <Route
                  path="settings/email-templates"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedEmailTemplatePreview />
                    </Suspense>
                  }
                />
                <Route
                  path="notifications"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <ProtectedNotifications />
                    </Suspense>
                  }
                />
                <Route
                  path="posting-board"
                  element={
                    <PostingBoardProvider>
                      <Suspense fallback={LoadingMessage}>
                        <ProtectedPostingBoard />
                      </Suspense>
                    </PostingBoardProvider>
                  }
                >
                  <Route
                    path="saved-posts"
                    element={
                      <Suspense fallback={LoadingMessage}>
                        <ProtectedPostingBoard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="my-posts"
                    element={
                      <Suspense fallback={LoadingMessage}>
                        <ProtectedPostingBoard />
                      </Suspense>
                    }
                  />
                </Route>
                {/* will be added later */}
                {/* <Route
                  exact
                  path="dealer/:id"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <DealerContext>
                        <ProtectedDealer />
                      </DealerContext>
                    </Suspense>
                  }
                />
                <Route
                  exact
                  path="dealer/:id/edit"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <DealerContext>
                        <ProtectedDealerSettings />
                      </DealerContext>
                    </Suspense>
                  }
                />
                <Route
                  exact
                  path="dealer/:id/update"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <DealerContext>
                        <ProtectedDealerSettingsTabView />
                      </DealerContext>
                    </Suspense>
                  }
                />
                <Route
                  exact
                  path="dealer/:id/gallery"
                  element={
                    <Suspense fallback={LoadingMessage}>
                      <DealerContext>
                        <ProtectedDealerGallery />
                      </DealerContext>
                    </Suspense>
                  }
                /> */}
              </Route>
            </Routes>
          )}
        </Box>
      </LayoutProvider>
    </ThemeProvider>
  );
}

const App = () => {
  const libraries = ["places"];
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <BrowserRouter>
      <AuthProvider>
        <SubscriptionProvider>
          <SocketProvider>
            <ReduxProvider store={store}>
              <NotificationsProvider>
                <LoadScript
                  googleMapsApiKey={googleMapsApiKey}
                  libraries={libraries}
                  render={(googleMaps, error) =>
                    googleMaps ? (
                      <AppRouter />
                    ) : (
                      <div>{error ? error : LoadingMessage}</div>
                    )
                  }
                >
                  <AppRouter />
                </LoadScript>
              </NotificationsProvider>
            </ReduxProvider>
          </SocketProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
