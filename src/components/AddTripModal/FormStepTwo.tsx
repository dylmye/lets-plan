import React from "react";
import { DatePicker } from "formik-mui-x-date-pickers";
import { Field, useFormikContext } from "formik";
import dayjs from "dayjs";

import TripDraft from "../../types/TripDraft";
import styles from "./styles.module.css";

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
        maxDate={values?.endsAt && dayjs(values.endsAt)}
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
