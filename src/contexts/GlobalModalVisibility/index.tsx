import React, { createContext, useContext, useState } from "react";

import Trip from "../../types/Trip";
import { AuthenticationModalProps } from "../../components/AuthenticationModal";

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
  /** for Delete Trip dialog */
  deleteTrip: { id: string; title: string } | null;
  setDeleteTrip: SetState<GlobalModalVisibilityContextInterface["deleteTrip"]>;
}

export const GlobalModalVisibilityContext =
  createContext<GlobalModalVisibilityContextInterface | null>({
    visible: false,
    toggleVisible: () => {},
    authType: null,
    setAuthType: () => {},
    trip: null,
    setTrip: () => {},
    deleteTrip: null,
    setDeleteTrip: () => {},
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

/** Enable modals & dialogs to be opened from anywhere. Using a context is easier than passing props down from a page to a menu element.
 * To add a new global modal:
 * 1. Add the modal/dialog component low down in the stack: we use App.tsx
 * 2. Add two properties to the context interface: the boolean/object prop that determines visibility (and optionally any state the modal needs), and the function prop that toggles visibility
 * 3. Implement these props in the createContext above and the provider below. Typically this is done using a useState hook.
 * 4. Where the button to trigger the modal is, set the two props as required.
 *
 * A good example of this is deleteTrip, used to show a delete confirmation dialog for a given trip. The trigger code is in the `TripDetailsAction` component.
 * If you are sure your modal will only show on one page, there's no need to put it here :)
 */
const GlobalModalVisibility: React.FC = ({ children }) => {
  const [visible, toggleVisible] = useState<boolean>(false);
  const [authType, setAuthType] = useState<
    AuthenticationModalProps["type"] | null
  >(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [deleteTrip, setDeleteTrip] =
    useState<GlobalModalVisibilityContextInterface["deleteTrip"]>(null);

  return (
    <GlobalModalVisibilityContext.Provider
      value={{
        visible,
        toggleVisible,
        authType,
        setAuthType,
        trip,
        setTrip,
        deleteTrip,
        setDeleteTrip,
      }}>
      {children}
    </GlobalModalVisibilityContext.Provider>
  );
};

export default GlobalModalVisibility;
