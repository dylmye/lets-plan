import React, { useContext, createContext, useState } from "react";

import { AuthenticationModalProps } from "../../components/AuthenticationModal";

export interface AuthModalVisibleContextInterface {
  visible: boolean;
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  authType: AuthenticationModalProps["type"] | null;
  setAuthType: React.Dispatch<
    React.SetStateAction<AuthenticationModalProps["type"] | null>
  >;
}

export const AuthModalVisibleContext =
  createContext<AuthModalVisibleContextInterface | null>({
    visible: false,
    toggleVisible: () => {},
    authType: null,
    setAuthType: () => {},
  });

export const useAuthModalVisible = () => {
  const ctx = useContext(AuthModalVisibleContext);
  if (!ctx) {
    throw new Error(
      "Called useAuthModalVisible outside of a AuthModalVisibleProvider"
    );
  }

  return ctx;
};

const AuthModalVisible: React.FC = ({ children }) => {
  const [visible, toggleVisible] = useState<boolean>(false);
  const [authType, setAuthType] = useState<
    AuthenticationModalProps["type"] | null
  >(null);

  return (
    <AuthModalVisibleContext.Provider
      value={{ visible, toggleVisible, authType, setAuthType }}
    >
      {children}
    </AuthModalVisibleContext.Provider>
  );
};

export default AuthModalVisible;
