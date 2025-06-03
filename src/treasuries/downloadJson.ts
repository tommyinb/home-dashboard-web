import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebases/storage";

export async function downloadJson<T>(path: string): Promise<T> {
  const file = ref(storage, path);
  const url = await getDownloadURL(file);

  const response = await fetch(url);
  const value = await response.json();

  return value as T;
}
