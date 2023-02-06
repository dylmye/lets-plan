import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface CopyToClipboardButtonProps {
  textToCopy: string;
  onClickCopy?: (textToCopy: string) => void;
}

const CopyToClipboardButton = ({
  textToCopy,
  onClickCopy,
}: CopyToClipboardButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = (text: string): void => {
    onClickCopy && onClickCopy(text);
    navigator.clipboard.writeText(text).then(() => {
      enqueueSnackbar("Copied to clipboard successfully");
    });
  };

  return (
    <Tooltip title="Copy this to your clipboard">
      <IconButton
        size="small"
        aria-label="Click to copy the text to your clipboard"
        onClick={() => onClick(textToCopy)}>
        <ContentCopy fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
