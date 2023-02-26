import { useIsLoggedIn } from "../features/auth";
import { Providers } from "../../types/store";

/**
 * Determine which provider to get data from
 * @returns The Provider to use
 */
const useGetActiveProvider = (): Providers => {
  const loggedIn = useIsLoggedIn();

  if (loggedIn) {
    return "firestore";
  } else {
    return "redux";
  }
};

export default useGetActiveProvider;
