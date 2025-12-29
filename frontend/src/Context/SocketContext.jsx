import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
const SocketContext = createContext();

import { io } from "socket.io-client";

export const SocketProvider = ({ children }) => {
  const { userId } = useAuth();
  const [isConnected, setisConnected] = useState(false);

  const socket = useRef(null);

  useEffect(() => {
    if (!isConnected && userId) {
      socket.current = io({
        withCredentials: true,
      });

      socket.current.on("connect", () => {
        console.info(`Successfully connected to socket ${userId}`);
        setisConnected(true);
        socket.current.emit("ONLINE", {
          status: "online",
          timestamp: Date.now(),
        });
        socket.current.emit("JOIN_ROOM", `${userId}`);
      });

      socket.current.on("disconnect", () => {
        console.info(`Successfully disconnected`);
        setisConnected(false);
      });

      socket.current.on("error", (err) => {
        console.error("Socket error:", err);
      });
    }

    return () => {
      if (socket.current && socket.current.connected) {
        // Restore original emit function before disconnecting
        if (socket.current._originalEmit) {
          socket.current.emit = socket.current._originalEmit;
        }
        socket.current.disconnect();
      }
    };
  }, [userId]);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      if (isConnected) {
        socket.current.emit("ONLINE", {
          status: "online",
          timestamp: Date.now(),
        });
      }
    }, 10000);

    return () => {
      clearInterval(pulseInterval);
    };
  }, [isConnected]);

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
