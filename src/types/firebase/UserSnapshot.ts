import { DocumentData, Timestamp } from "firebase/firestore";

export default interface UserSnapshot extends DocumentData {
  userSchemaRevision: 1;
  name: string;
  createdAt: Timestamp;
}
