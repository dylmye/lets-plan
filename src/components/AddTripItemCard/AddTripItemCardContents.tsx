import React from "react";
import { Formik } from "formik";
import dayjs from "dayjs";

import { AddTripItemCardProps } from ".";
import TripItemDraft from "../../types/TripItemDraft";
import { TravelTypes, TripItemType } from "../../types/TripItemType";
import AddEditTripItemForm from "./AddEditTripItemForm";
import { useAddTripItem } from "../../store/features/trips";

/** A wrapper for [`AddEditTripItemForm`](./AddEditTripItemForm.tsx) with the "Add Trip Item" Formik */
const AddTripItemCardContents = ({
  initialValues,
  tripDetails,
  showCancel = false,
  onCancel,
}: AddTripItemCardProps) => {
  const addTripItem = useAddTripItem();
  return (
    <Formik<TripItemDraft>
      initialValues={{
        category: TravelTypes.includes(initialValues.type as TripItemType)
          ? "travel"
          : "activity",
        type: (initialValues.type as TripItemType) ?? null,
        title: "",
        startsAt: initialValues.date as string,
        startsAtTimezone: "Europe/London",
      }}
      onSubmit={(values) => {
        if (!tripDetails?.id) {
          console.error("Couldn't add trip item, no trip id specified");
          return;
        }

        addTripItem({
          ...values,
          tripId: tripDetails.id,
          startsAt: dayjs(values.startsAt).format(),
          endsAt: values.endsAt && dayjs(values.endsAt).format(),
        });

        onCancel && onCancel();
      }}
      // validationSchema={validationSchema} We can't use validation here because the type is a dictionary (to allow extra fields)
    >
      <AddEditTripItemForm
        showCancel={showCancel}
        onCancel={onCancel}
        tripDetails={tripDetails}
      />
    </Formik>
  );
};

export default AddTripItemCardContents;
