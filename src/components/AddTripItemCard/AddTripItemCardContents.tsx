import React from "react";
import { Formik } from "formik";
import dayjs from "dayjs";

import { AddTripItemCardProps } from ".";
import TripItemDraft from "../../types/TripItemDraft";
import { TravelTypes, TripItemType } from "../../types/TripItemType";
import { useAppDispatch } from "../../app/hooks";
import { addTripItemByTripId } from "../../features/tripList/tripSlice";
import AddEditTripForm from "./AddEditTripForm";

const AddTripItemCardContents = ({
  initialValues,
  tripDetails,
  showCancel = false,
  onCancel,
}: AddTripItemCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <Formik<TripItemDraft>
      initialValues={{
        category: TravelTypes.includes(initialValues.type as TripItemType)
          ? "travel"
          : "activity",
        type: (initialValues.type as TripItemType) ?? null,
        title: "",
        startsAt: initialValues.date as string,
        endsAt: null,
      }}
      onSubmit={(values) => {
        if (!tripDetails?.id) {
          console.error("Couldn't add trip item, no trip id specified");
          return;
        }

        dispatch(
          addTripItemByTripId({
            ...values,
            id: tripDetails.id,
            startsAt: dayjs(values.startsAt).format(),
            endsAt: values.endsAt && dayjs(values.endsAt).format(),
          })
        );

        onCancel && onCancel();
      }}
      // validationSchema={validationSchema} We can't use validation here because the type is a dictionary (to allow extra fields)
    >
      <AddEditTripForm
        showCancel={showCancel}
        onCancel={onCancel}
        tripDetails={tripDetails}
      />
    </Formik>
  );
};

export default AddTripItemCardContents;
