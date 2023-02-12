import { useAppSelector } from "../../app/hooks";
import { isLoggedIn } from "../../features/login/authSlice";
import { Providers } from "../../types/store";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Determine which provider to get data from
 * @returns The Provider to use
 */
const useGetActiveProvider = (): Providers => {
  const loggedIn = useAppSelector(isLoggedIn);
  const [state, setState] = useState<Providers>("redux");

  useEffect(() => {
    if (loggedIn) {
      setState("firestore");
    } else {
      setState("redux");
    }
  }, [loggedIn]);

  return state;
};

export default useGetActiveProvider;
