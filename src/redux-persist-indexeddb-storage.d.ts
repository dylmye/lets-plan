declare module "redux-persist-indexeddb-storage" {
  import { Storage } from "redux-persist";

  export default function (dbName: string): {
    db: any;
  } & Storage;
}
