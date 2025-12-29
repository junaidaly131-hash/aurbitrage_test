import { createContext, useContext, useState, useEffect } from "react";
import useCheckSession from "@/Login/hooks/useCheckSession";
import useRemoveSession from "@/Login/hooks/useRemoveSession";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const getUserData = () => {
  const storageType =
    localStorage.getItem("rememberMe") === "true"
      ? localStorage
      : sessionStorage;

  const token = storageType.getItem("token");
  const userRole = storageType.getItem("userRole");
  const userName = storageType.getItem("userName");
  const userId = storageType.getItem("userId");
  const dealerId = storageType.getItem("dealerId");
  const dealerName = storageType.getItem("dealerName");
  const email = storageType.getItem("email");
  const phoneNo = storageType.getItem("phoneNo");
  const contributor = storageType.getItem("contributor");
  const profileImage = storageType.getItem("profileImage") || null;
  const isStoneXIntegrated = storageType.getItem("isStoneXIntegrated");
  const isDillionGageIntegrated = storageType.getItem(
    "isDillionGageIntegrated",
  );
  const isUpstateIntegrated = storageType.getItem("isUpstateIntegrated");
  return {
    token,
    userRole,
    userName,
    userId,
    dealerId,
    dealerName,
    email,
    phoneNo,
    contributor,
    profileImage,
    isStoneXIntegrated,
    isDillionGageIntegrated,
    isUpstateIntegrated,
    storageType,
  };
};

export const AuthProvider = ({ children }) => {
  const {
    message,
    loading: sessionLoading,
    isValid: validSession,
    checkSession,
  } = useCheckSession();
  const { removeSession } = useRemoveSession();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState(getUserData());

  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedEmail = Cookies.get("savedEmail");
    const savedPassword = Cookies.get("savedPassword");
    if (!validSession) {
      if (savedEmail && savedPassword) {
        const log = parseInt(localStorage.getItem("logout"));
        if (!log) {
          handleLogin(savedEmail, savedPassword, true);
        }
      } else {
        logout();
        toast.error("Session Expired! Please login again");
      }
    }
  }, [validSession, message]);

  const login = (newToken, userData, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    localStorage.removeItem("logout");
    storage.setItem("token", newToken);
    Object.keys(userData).forEach((key) => {
      storage.setItem(key, userData[key]);
    });
    storage.setItem("rememberMe", rememberMe);

    setUser((prev) => ({
      ...prev,
      ...userData,
      token: newToken,
      storageType: rememberMe ? localStorage : sessionStorage,
    }));
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    removeSession();
    localStorage.setItem("logout", "1");
    const e = Cookies.get("savedEmail");
    if (!e) {
      Cookies.remove("savedEmail");
      Cookies.remove("savedPassword");
    }
    setUser({
      token: null,
      userRole: null,
      userName: null,
      userId: null,
      dealerId: null,
      dealerName: null,
      email: null,
      phoneNo: null,
      contributor: null,
      profileImage: null,
    });
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    const apiEndpoint = `api/v1/user/login`;
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setIsLoading(false);
      const errorData = await response.json();
      toast.error(errorData.message || "An error occurred during login.");
      return;
    }

    const result = await response.json();
    const userData = {
      userRole: result.data.UserRole,
      userName: result.data.UserName,
      userId: result.data.UserId,
      dealerId: result.data.DealerId,
      dealerName: result.data.DealerName,
      email: result.data.email,
      phoneNo: result.data.phoneNo,
      profileImage: result.data.profileImage,
      contributor: result.data.contributor,
      isStoneXIntegrated: result.data.isStoneXIntegrated,
      isDillionGageIntegrated: result.data.isDillionGageIntegrated,
      isUpstateIntegrated: result.data.isUpstateIntegrated,
    };

    login(result.data.Token, userData, true);
    navigate(from === "/" ? "/dashboard/pricing" : from);
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
        setUser,
        login,
        logout,
        handleLogin,
        isLoading,
        sessionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
