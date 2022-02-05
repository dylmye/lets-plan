/** Translate the File type value to a file extension */
export const getExtensionByMimetype = (
  mimetype: string
): string | undefined => {
  switch (mimetype) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    default:
      console.error("unsupported filetype:", mimetype);
      break;
  }
};
