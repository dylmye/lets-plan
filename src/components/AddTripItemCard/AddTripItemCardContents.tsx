import React, { useCallback } from "react";
import { Formik } from "formik";
import dayjs from "dayjs";

import { TripItemType } from "../../types/TripItemType";
import TripItemDraft from "../../types/TripItemDraft";
import { useAddTripItem } from "../../store/features/trips";
import { getTripItemCategory } from "../../helpers/tripItems";
import AddEditTripItemForm from "./AddEditTripItemForm";
import { AddTripItemCardProps } from ".";

/** A wrapper for [`AddEditTripItemForm`](./AddEditTripItemForm.tsx) with the "Add Trip Item" Formik */
const AddTripItemCardContents = ({
  initialValues,
  tripDetails,
  showCancel = false,
  onCancel,
}: AddTripItemCardProps) => {
  const addTripItem = useAddTripItem();

  const onSubmit = useCallback(
    (formData: TripItemDraft) => {
      if (!tripDetails?.id) {
        console.error("Couldn't add trip item, no trip id specified");
        return;
      }

      addTripItem({
        ...formData,
        tripId: tripDetails.id,
        startsAt: dayjs(formData.startsAt).format(),
        endsAt: formData.endsAt && dayjs(formData.endsAt).format(),
      });

      onCancel && onCancel();
    },
    [tripDetails?.id, addTripItem, onCancel]
  );

  return (
    <Formik<TripItemDraft>
      initialValues={{
        category: getTripItemCategory(initialValues as { type: TripItemType }),
        type: (initialValues.type as TripItemType) ?? null,
        title: "",
        startsAt: initialValues.date!,
        endsAt: null,
      }}
      onSubmit={onSubmit}
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
