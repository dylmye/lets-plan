import React, { useContext, createContext, useState } from "react";

import { AuthenticationModalProps } from "../../components/AuthenticationModal";
import Trip from "../../types/Trip";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface GlobalModalVisibilityContextInterface {
  visible: boolean;
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /** for auth modal */
  authType: AuthenticationModalProps["type"] | null;
  /** for auth modal */
  setAuthType: SetState<AuthenticationModalProps["type"] | null>;
  /** for Edit Trip Details modal */
  trip: Trip | null;
  setTrip: SetState<Trip | null>;
}

export const GlobalModalVisibilityContext =
  createContext<GlobalModalVisibilityContextInterface | null>({
    visible: false,
    toggleVisible: () => {},
    authType: null,
    setAuthType: () => {},
    trip: null,
    setTrip: () => {},
  });

export const useGlobalModalVisibility = () => {
  const ctx = useContext(GlobalModalVisibilityContext);
  if (!ctx) {
    throw new Error(
      "Called useGlobalModalVisibility outside of a GlobalModalVisibilityProvider"
    );
  }

  return ctx;
};

const GlobalModalVisibility: React.FC = ({ children }) => {
  const [visible, toggleVisible] = useState<boolean>(false);
  const [authType, setAuthType] = useState<
    AuthenticationModalProps["type"] | null
  >(null);
  const [trip, setTrip] = useState<Trip | null>(null);

  return (
    <GlobalModalVisibilityContext.Provider
      value={{ visible, toggleVisible, authType, setAuthType, trip, setTrip }}
    >
      {children}
    </GlobalModalVisibilityContext.Provider>
  );
};

export default GlobalModalVisibility;
