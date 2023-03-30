import React, { memo } from "react";
import { useFormikContext } from "formik";
import { Button, MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import TripDraft from "../../types/TripDraft";

interface Props {
  activeStep: number;
  totalSteps: number;
  onPressBack: () => void;
  onPressNext: () => void;
  onClose: () => void;
}

/** Visual controller for AddTripModal's form */
const FormPagination = memo(
  ({ activeStep, totalSteps, onPressBack, onPressNext, onClose }: Props) => {
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === totalSteps - 1;
    const { submitForm, resetForm, isSubmitting } =
      useFormikContext<TripDraft>();

    const onDismiss = () => {
      resetForm();
      onClose();
    };

    return (
      <MobileStepper
        variant="dots"
        steps={totalSteps}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button
            size="small"
            onClick={isFirstStep ? onDismiss : onPressBack}
            disabled={isSubmitting}>
            {isFirstStep ? (
              "Cancel"
            ) : (
              <>
                <KeyboardArrowLeft />
                Back
              </>
            )}
          </Button>
        }
        nextButton={
          <Button
            size="small"
            onClick={isLastStep ? submitForm : onPressNext}
            disabled={isSubmitting}>
            {isLastStep ? "Create Trip" : "Next"}
            <KeyboardArrowRight />
          </Button>
        }
      />
    );
  }
);

export default FormPagination;
