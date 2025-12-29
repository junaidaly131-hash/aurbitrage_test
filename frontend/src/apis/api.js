import { PUBLIC_ROUTES } from "@/constants/routes";

const isPublicRoute = (path) => {
  return PUBLIC_ROUTES.some(
    (route) =>
      path === route ||
      path.startsWith("/reset-password/") ||
      path.startsWith("/invite-registration/") ||
      path.startsWith("/userfeedback/"),
  );
};

/**
 * Get authentication token from storage
 * @returns {string|null} The authentication token or null if not found
 */
const getAuthToken = () => {
  const storageType =
    localStorage.getItem("rememberMe") === "true"
      ? localStorage
      : sessionStorage;

  return storageType.getItem("token");
};

const apiRequest = async (
  method,
  url,
  payload = null,
  signal = null,
  headers = null,
) => {
  if (!method || !url) {
    console.error("Missing required parameters: method and url are required.");
    return { error: "Method and URL are required." };
  }

  const options = {
    method: method,
    headers: headers || {
      ...(payload instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    body:
      payload instanceof FormData
        ? payload
        : payload
          ? JSON.stringify(payload)
          : null,
    signal: signal,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorResult = await response.json();

      if (response.status === 401) {
        const currentPath = window.location.pathname;

        if (!isPublicRoute(currentPath)) {
          window.location.href = "/login";
        }
        return;
      }

      throw new Error(
        errorResult?.message || errorResult?.data || "Something went wrong",
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (
      error.message === "Session expired. Please log in again." ||
      error.message === "Unauthorized" ||
      error.message?.includes("authentication")
    ) {
      const currentPath = window.location.pathname;
      if (!isPublicRoute(currentPath)) {
        window.location.href = "/login";
      }
      return;
    }

    if (error.response) {
      console.error("API request failed with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in API request:", error.message);
    }
    throw error;
  }
};

const get = (url, signal) => apiRequest("GET", url, null, signal);
const post = (url, payload, signal) => apiRequest("POST", url, payload, signal);
const patch = (url, payload, signal, headers) =>
  apiRequest("PATCH", url, payload, signal, headers);
const del = (url, payload, signal) =>
  apiRequest("DELETE", url, payload, signal);

export const api = {
  get,
  post,
  patch,
  del,
};

export { getAuthToken };
