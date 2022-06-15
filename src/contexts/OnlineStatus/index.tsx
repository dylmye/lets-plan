import React, { createContext, useContext, useEffect, useState } from "react";

export interface OnlineStatusContextInterface {
  online: boolean;
}

export const OnlineStatusContext =
  createContext<OnlineStatusContextInterface | null>({ online: false });

export const useOnlineStatus = () => {
  const ctx = useContext(OnlineStatusContext);
  if (!ctx) {
    throw new Error("Called useOnlineStatus outside of an OnlineStatusContext");
  }

  return ctx;
};

const OnlineStatus: React.FC = ({ children }) => {
  const [isOnline, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("offline", () => setOnlineStatus(false));
    window.addEventListener("online", () => setOnlineStatus(true));

    return () => {
      window.removeEventListener("offline", () => setOnlineStatus(false));
      window.removeEventListener("online", () => setOnlineStatus(true));
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={{ online: isOnline }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export default OnlineStatus;
