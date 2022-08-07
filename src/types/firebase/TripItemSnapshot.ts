import { Timestamp, DocumentReference, DocumentData } from 'firebase/firestore';
import { TripItemType } from '../TripItemType';
import TripSnapshot from './TripSnapshot';

export default interface TripItemSnapshot extends DocumentData {
  tripItemSchemaRevision: 1;
  title: string | null;
  details: string | null;
  originLocation: string | null;
  destinationLocation: string | null;
  parent: DocumentReference<TripSnapshot>;
  startsAt: Timestamp;
  startsAtTimezone: string;
  endsAt: Timestamp;
  endsAtTimezone: string;
  type: TripItemType;
}
