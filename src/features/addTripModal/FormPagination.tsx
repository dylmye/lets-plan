import React, { memo } from "react";
import { Button, MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useFormikContext } from "formik";

interface Props {
  activeStep: number;
  totalSteps: number;
  onPressBack: () => void;
  onPressNext: () => void;
}

const FormPagination = memo(
  ({ activeStep, totalSteps, onPressBack, onPressNext }: Props) => {
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === totalSteps - 1;
    const { submitForm } = useFormikContext();

    return (
      <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button size="small" onClick={onPressBack} disabled={isFirstStep}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
        nextButton={
          <Button size="small" onClick={isLastStep ? submitForm : onPressNext}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
      />
    );
  }
);

export default FormPagination;
