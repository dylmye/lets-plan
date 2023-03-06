import { ButtonProps } from "@mui/material";

export default interface SignInButtonProps extends ButtonProps {
  /** Whether to show copy for signing in, versus signing up */
  alreadyHasAccount: boolean;
  onClick: () => void;
}
