import { AuthError } from "firebase/auth";

/** Determine the human-readable message for Firebase Auth error codes */
export const renderFriendlyAuthMessages = (error: AuthError) => {
  switch (error.code) {
    case "auth/account-exists-with-different-credential": {
      return "You've already signed up with this email address a different way.";
    }
    case "auth/popup-blocked": {
      return "Please enable popups and try again.";
    }
    case "auth/popup-closed-by-user": {
      return "The login popup was closed before login finished.";
    }
    case "auth/invalid-email": {
      return "The email provided was invalid.";
    }
    case "auth/user-disabled": {
      return "This account has been disabled.";
    }
    case "auth/user-not-found":
    case "auth/wrong-password": {
      return "Either no account exists for this email, or the provided password was incorrect.";
    }
    case "auth/expired-action-code": {
      return "The code used to login has expired, please request a new one.";
    }
    default: {
      return "Technical issues encountered trying to authenticate. Please try again.";
    }
  }
};
