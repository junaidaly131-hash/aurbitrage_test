import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import Tooltip from "@mui/material/Tooltip";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  if (token != null) {
    return (
      <Tooltip title={"Logout"}>
        <FontAwesomeIcon
          size="xl"
          style={{ cursor: "pointer", color: "#fff" }}
          icon={faRightFromBracket}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip title={"Login"}>
      <FontAwesomeIcon
        size="xl"
        style={{ cursor: "pointer" }}
        icon={faRightToBracket}
        onClick={() => logout()}
      />
    </Tooltip>
  );
};

export default LoginButton;
