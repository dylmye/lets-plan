import { useOnlineStatus } from "../contexts/OnlineStatus";

export const useSmartFieldName = (
  onlineName: string,
  offlineName: string
): string => {
  const { online: isOnline } = useOnlineStatus();

  if (isOnline) {
    return onlineName;
  }
  return offlineName;
};
