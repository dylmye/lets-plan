import {
  mixed as yMixed,
  object as yObject,
  string as yString,
  ObjectSchema,
} from "yup";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { Form, Formik } from "formik";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import dayjs from "dayjs";
import { Alert, Box, Modal, SxProps, Theme, Typography } from "@mui/material";

import TripSchemaRevisions from "../../types/TripSchemaRevisions";
import TripDraft from "../../types/TripDraft";
import ModalProps from "../../types/ModalProps";
import { useAddTrip } from "../../store/features/trips";
import {
  getExtensionByMimetype,
  getUploadErrorFriendlyText,
} from "../../helpers/upload";
import { storage } from "../../firebase";
import { useOnlineStatus } from "../../contexts/OnlineStatus";

import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import FormStepOne from "./FormStepOne";
import FormPagination from "./FormPagination";

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

/** Dialog for creating a new [`Trip`](../../types/Trip.ts). The form
 * is made up of multiple steps - See FormStep*.tsx files. They are controlled
 * via [`FormPagination`](./FormPagination.tsx)
 */
const AddTripModal = (props: ModalProps) => {
  const { online } = useOnlineStatus();
  const { enqueueSnackbar } = useSnackbar();
  const addTrip = useAddTrip();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formImageUploading, setFormImageUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const TOTAL_STEPS = online ? 3 : 2;

  const today = useMemo(() => dayjs.utc(), []);

  const goBack = useCallback(() => setActiveStep(activeStep - 1), [activeStep]);
  const goForward = useCallback(
    () => setActiveStep(activeStep + 1),
    [activeStep]
  );

  const renderFormStep = () => {
    switch (activeStep) {
      case 0: {
        return <FormStepOne />;
      }
      case 1: {
        return <FormStepTwo />;
      }
      case 2: {
        if (online) {
          return <FormStepThree isImageUploading={formImageUploading} />;
        }
        return null;
      }
      default: {
        return null;
      }
    }
  };

  const validationSchema: ObjectSchema<TripDraft> = yObject().shape({
    tripSchemaRevision: yMixed<TripSchemaRevisions>().oneOf([1]).required(),
    id: yString().required(),
    title: yString().required("You need to give your trip a title"),
    location: yString().required(
      "Please provide a location for the trip. If it's in multiple locations, enter the first"
    ),
    startsAt: yString().nullable().required("Trips need a start date"),
    endsAt: yString().nullable().required("Trips need an end date"),
    image: yString().optional(),
    // keep these rules in sync with your storage rules in Firebase
    coverImageBlob: yMixed<File>()
      .nullable()
      .test("fileSize", "The cover image needs to be under 1MB", (value) => {
        // we have to do these dumb conversions
        // because the type for the field is File
        // but dropzone always gives us File[]
        // even though in the browser we actually
        // get a File. lol.
        if (!(value as unknown as File[])?.length) return true; // no file required
        return (value as unknown as File[])[0].size < 1000000;
      })
      .test(
        "fileMimeType",
        "The cover image needs to be in png, jpg or webp format",
        (value) => {
          if (!(value as unknown as File[])?.length) return true; // no file required
          return ["image/png", "image/jpg", "image/webp"].includes(
            (value as unknown as File[])[0].type
          );
        }
      ),
  });

  /**
   * Upload a blob to Firebase Storage and get its URI
   * @param blob The file to upload
   * @param tripId The trip ID to upload the file under
   * @returns The newly created file's URI
   */
  const getCoverImageUri = async (
    blob: File,
    tripId: string
  ): Promise<string> => {
    let coverImageUri: string | null = null;
    const extension = getExtensionByMimetype(blob.type);
    const storageRef = ref(storage, `trip-thumbs/${tripId}.${extension}`);

    setFormImageUploading(true);
    let res: UploadResult | null = null;
    try {
      res = await uploadBytes(storageRef, blob);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFormError(getUploadErrorFriendlyText(e));
        console.error("trip thumb upload failed:", e.code, res?.metadata);
      }
    }
    setFormImageUploading(false);

    coverImageUri = await getDownloadURL(storageRef);
    return coverImageUri;
  };

  const onFormSubmit = async (values: TripDraft) => {
    let coverImageUri: string | null = null;

    setFormError(null);
    if (values.coverImageBlob) {
      coverImageUri = await getCoverImageUri(values.coverImageBlob, values.id);
      delete values.coverImageBlob;
    }
    const newTrip = await addTrip({ ...values, image: coverImageUri });
    setActiveStep(0);
    props.onClose();
    navigate(`/trip/${newTrip.id}`);
    enqueueSnackbar("Trip created!");
  };

  const onModalClose = () => {
    setActiveStep(0);
    props.onClose();
  };

  return (
    <Modal
      {...props}
      onClose={onModalClose}
      aria-labelledby="modal-addtrip-title">
      <Box sx={dialogStyle}>
        <Typography variant="h5">
          <strong id="modal-addtrip-title">Add A Trip</strong>
        </Typography>
        <Formik<TripDraft>
          initialValues={{
            tripSchemaRevision: 1,
            id: uuidv4(),
            title: "",
            location: "",
            startsAt: today.format("YYYY-MM-DD"),
            endsAt: today.add(7, "day").format("YYYY-MM-DD"),
            coverImageBlob: null,
          }}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}>
          {({ errors }) => (
            <Form>
              {formError || Object.keys(errors)?.length ? (
                <Alert severity="error">
                  {formError}
                  {formError ? <br /> : undefined}
                  {Object.keys(errors)?.length
                    ? Object.values(errors)?.map((k) => <p key={k}>{k}</p>)
                    : undefined}
                </Alert>
              ) : undefined}
              {renderFormStep()}
              <FormPagination
                activeStep={activeStep}
                totalSteps={TOTAL_STEPS}
                onPressBack={goBack}
                onPressNext={goForward}
                onClose={props.onClose}
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddTripModal;
