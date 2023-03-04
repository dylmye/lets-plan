import {
  SchemaOf,
  mixed as yMixed,
  object as yObject,
  string as yString,
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

  const today = useMemo(() => dayjs(), []);

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

  const validationSchema: SchemaOf<TripDraft> = yObject().shape({
    tripSchemaRevision: yMixed().oneOf([1]).required(),
    id: yString().required(),
    title: yString().required("You need to give your trip a title"),
    location: yString().required("Trips need to be somewhere"),
    startsAt: yString().nullable().required("Trips need a start date"),
    endsAt: yString().nullable().required("Trips need an end date"),
    image: yString().optional(),
    // keep these rules in sync with your storage rules in Firebase
    coverImageBlob: yMixed()
      .test(
        "fileSize",
        "The cover image needs to be under 1MB",
        (value: File[]) => {
          if (!value?.length) return true; // no file required
          return value[0].size < 1000000;
        }
      )
      .test(
        "fileMimeType",
        "The cover image needs to be in png, jpg or webp format",
        (value: File[]) => {
          if (!value?.length) return true; // no file required
          console.debug("typetest", value[0].type);
          return ["image/png", "image/jpg", "image/webp"].includes(
            value[0].type
          );
        }
      ),
  });

  const onFormSubmit = async (values: TripDraft) => {
    let coverImageUri: string | null = null;

    setFormError(null);
    if (values.coverImageBlob) {
      const extension = getExtensionByMimetype(values.coverImageBlob.type);
      const storageRef = ref(storage, `trip-thumbs/${values.id}.${extension}`);

      setFormImageUploading(true);
      let res: UploadResult | null = null;
      try {
        res = await uploadBytes(storageRef, values.coverImageBlob);
        delete values.coverImageBlob;
      } catch (e) {
        if (e instanceof FirebaseError) {
          setFormError(getUploadErrorFriendlyText(e));
          console.error("trip thumb upload failed:", e.code, res?.metadata);
        }
      }
      setFormImageUploading(false);

      coverImageUri = await getDownloadURL(storageRef);
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
          validationSchema={validationSchema}>
          <Form>
            {formError && <Alert severity="error">{formError}</Alert>}
            {renderFormStep()}
            <FormPagination
              activeStep={activeStep}
              totalSteps={TOTAL_STEPS}
              onPressBack={goBack}
              onPressNext={goForward}
              onClose={props.onClose}
            />
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddTripModal;
