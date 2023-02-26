import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as providerRedux from "./redux";
import { AuthHooks } from "./interface";

export const useSetLoggedIn: AuthHooks["useSetLoggedIn"] = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (isLoggedIn) => {
      return dispatch(providerRedux.actions.setLoggedIn(isLoggedIn));
    },
    [dispatch]
  );
};

export const useSetUserId: AuthHooks["useSetUserId"] = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (newUserId) => {
      return dispatch(providerRedux.actions.setUserId(newUserId));
    },
    [dispatch]
  );
};

export const useIsLoggedIn: AuthHooks["useIsLoggedIn"] = () => {
  const isLoggedIn = useAppSelector(providerRedux.selectors.isLoggedIn);

  return isLoggedIn;
};

export const useGetUserId: AuthHooks["useGetUserId"] = () => {
  const userId = useAppSelector(providerRedux.selectors.getUserId);

  return userId;
};
