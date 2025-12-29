import { useContext } from "react";
import { Notifications } from "./Context";

const useNotifications = () => useContext(Notifications);

export { useNotifications };
