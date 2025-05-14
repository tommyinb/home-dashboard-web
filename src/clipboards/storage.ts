import { getStorage, ref } from "firebase/storage";
import { app } from "../firebases/firebase";

export const storage = getStorage(
  app,
  "gs://home-dashboard-7b463.firebasestorage.app"
);

export const folder = ref(storage, "clipboard");
