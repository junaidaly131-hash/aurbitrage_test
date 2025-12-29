/* eslint-disable react/display-name */
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (Element) => {
  return (props) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Element {...props} />;
  };
};

export default ProtectedRoute;
