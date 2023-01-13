import React from "react";
import { Field, useFormikContext } from "formik";
import { DatePicker } from "formik-mui-x-date-pickers";

import styles from "./styles.module.css";
import TripDraft from "../../types/TripDraft";
import dayjs from "dayjs";

const FormStepTwo = () => {
  const { values } = useFormikContext<TripDraft>();

  return (
    <div className={styles.formFieldsContainer}>
      <Field
        component={DatePicker}
        label="When does your trip start?"
        name="startsAt"
        textField={{
          fullWidth: true,
        }}
      />
      <Field
        component={DatePicker}
        label="And when does it end?"
        name="endsAt"
        textField={{
          fullWidth: true,
        }}
        defaultCalendarMonth={values?.startsAt && dayjs(values.startsAt)}
        minDate={values?.startsAt && dayjs(values.startsAt)}
      />
    </div>
  );
};

export default FormStepTwo;
