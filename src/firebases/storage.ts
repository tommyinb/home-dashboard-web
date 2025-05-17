import { getStorage } from "firebase/storage";
import { app } from "./firebase";

export const storage = getStorage(
  app,
  "gs://home-dashboard-7b463.firebasestorage.app"
);
