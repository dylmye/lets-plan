import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MobileStepper,
  Modal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { ref, uploadBytes, UploadResult } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { v5 as uuidv5 } from "uuid";

import { TripDraft } from "../../types/TripDraft";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import { storage } from "../../firebase";
import { getExtensionByMimetype, getUploadErrorFriendlyText } from "../../helpers/upload";
import { SchemaOf, object as yObject, string as yString, mixed as yMixed } from "yup";

export interface AddTripModalProps {
  open: boolean;
  onClose: () => void;
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

const AddTripModal = (props: AddTripModalProps) => {
  const TOTAL_STEPS = 3;
  const [activeStep, setActiveStep] = useState(0);
  const [formImageUploading, setFormImageUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const today = useMemo(() => dayjs(), []);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  const goBack = () => setActiveStep(activeStep - 1);
  const goForward = () => setActiveStep(activeStep + 1);

  const renderFormStep = () => {
    switch (activeStep) {
      case 0: {
        return <FormStepOne />;
      }
      case 1: {
        return <FormStepTwo />;
      }
      case 2: {
        return <FormStepThree isImageUploading={formImageUploading} />;
      }
      default: {
        return null;
      }
    }
  };

  const validationSchema: SchemaOf<TripDraft> = yObject().shape({
    title: yString().required(),
    location: yString().optional(),
    locationData: yObject().shape({
      label: yString(),
      value: yObject(),
    }).required(),
    startsAt: yString().required(),
    endsAt: yString().required(),
    // keep these rules in sync with your storage rules in Firebase
    coverImageBlob: yMixed().test("fileSize", "The cover image needs to be under 1MB", (value: File[]) => {
      if (!value?.length) return true; // no file required
      return value[0].size < 1000000;
    }).test("fileMimeType", "The cover image needs to be in png, jpg or webp format", (value: File[]) => {
      if (!value?.length) return true; // no file required
      console.debug(value[0].type);
      return ["image/png", "image/jpg", "image/webp"].includes(value[0].type);
    })
  });

  const onFormSubmit = async (values: TripDraft) => {
    let coverImageUri: string | null = null;

    setFormError(null);
    if (values.coverImageBlob) {
      const extension = getExtensionByMimetype(values.coverImageBlob.type);
      const filename = uuidv5(
        process.env.REACT_APP_UUID_NAMESPACE || "http://localhost",
        uuidv5.URL
      );
      console.debug(`uploading trip-thumbs/${filename}.${extension}...`);
      const storageRef = ref(storage, `trip-thumbs/${filename}.${extension}`);

      setFormImageUploading(true);
      let res: UploadResult;
      try {
        res = await uploadBytes(storageRef, values.coverImageBlob);
        if (res?.metadata.fullPath) {
          coverImageUri = res.metadata.fullPath;
        }
      } catch (e) {
        if (e instanceof FirebaseError) {
          setFormError(getUploadErrorFriendlyText(e));
          console.error("trip thumb upload failed:", e.code);
        }
      }
      setFormImageUploading(false);
    }
    console.log(coverImageUri);
    // @TODO: use action to save trip including url above
  };

  return (
    <Modal {...props} aria-labelledby="modal-addtrip-title">
      <Box sx={dialogStyle}>
        <Typography variant="h5">
          <strong id="modal-addtrip-title">Add A Trip</strong>
        </Typography>
        <Formik<TripDraft>
          initialValues={{
            title: "",
            location: "",
            startsAt: today.format("YYYY-MM-DD"),
            endsAt: today.add(7, "day").format("YYYY-MM-DD"),
            coverImageBlob: null,
          }}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            {formError && <Alert severity="error">{formError}</Alert>}
            {renderFormStep()}
            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={activeStep}
              backButton={
                <Button size="small" onClick={goBack} disabled={isFirstStep}>
                  Back
                  <KeyboardArrowLeft />
                </Button>
              }
              nextButton={
                !isLastStep ? (
                  <Button size="small" onClick={goForward}>
                    Next
                  </Button>
                ) : (
                  <Button size="small" type="submit">
                    Create
                    <KeyboardArrowRight />
                  </Button>
                )
              }
            />
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddTripModal;
