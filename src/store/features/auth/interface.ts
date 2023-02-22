import DataInterface from "../../../types/store/DataInterface";

/** Interface for provider actions */
export interface AuthActions {
  setLoggedIn: (isLoggedIn: boolean) => any;
  setUserId: (uid: string | null) => any;
}

/** Interface from provider selectors */
export interface AuthSelectors {
  isLoggedIn: (...args: any[]) => boolean;
  getUserId: (...args: any[]) => string | null;
}

export interface AuthImports
  extends DataInterface<AuthActions, AuthSelectors> {}

/** Interface for hook exports */
export interface AuthHooks {
  useSetLoggedIn: () => (isLoggedIn: boolean) => void;
  useSetUserId: () => (uid: string | null) => void;
  useIsLoggedIn: () => boolean;
  useGetUserId: () => string | null;
}
