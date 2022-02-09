import { FirebaseError } from "firebase/app";

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

/** Translate Firebase error names into useful text */
export const getUploadErrorFriendlyText = (error: FirebaseError): string => {
  switch (error?.code) {
    case "storage/unauthorized":
      return "Cover image must be < 1MB and a png, jpg or webp file";
    default:
      return `Unknown error: ${error.code}`;
  }
};
