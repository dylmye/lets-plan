import React from "react";
import { Box, Modal, SxProps, Theme } from "@mui/material";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";

export interface AuthenticationModalProps {
  open: boolean;
  type: "sign-in" | "sign-up" | null;
  onClose: (success: boolean) => void;
}

export interface AuthModalContentProps {
  onClose: (success: boolean) => void;
}

const dialogStyle: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/** Sign In / Sign Up modal wrapper */
const AuthenticationModal = ({
  open,
  type,
  onClose,
}: AuthenticationModalProps) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-auth-title">
    <Box sx={dialogStyle}>
      {type === "sign-in" ? (
        <SignInContent onClose={onClose} />
      ) : (
        <SignUpContent onClose={onClose} />
      )}
    </Box>
  </Modal>
);

export default AuthenticationModal;
