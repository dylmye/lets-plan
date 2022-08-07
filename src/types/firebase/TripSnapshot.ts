import { Timestamp, DocumentReference, DocumentData } from 'firebase/firestore';

export default interface TripSnapshot extends DocumentData {
  tripSchemaRevision: 1;
  details: string | null;
  image: string | null;
  items: DocumentReference<TripSnapshot>[];
  location: string | null;
  public: boolean;
  title: string;
  userId: string | null;
  createdAtUtc: Timestamp;
  updatedAtUtc: Timestamp;
  startsAt: Timestamp;
  endsAt: Timestamp;
}
