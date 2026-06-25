import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function toggleStarred(id: string, value: boolean) {
  const projectRef = doc(db, "projects", id);
  const snap = await getDoc(projectRef);
    if (snap.exists()) {
      const currentValue = snap.data().showOnFrontend;
      await updateDoc(projectRef, { showOnFrontend: !currentValue });
      console.log(`Project ${id} showOnFrontend toggled to ${!currentValue}`);
      window.location.reload();
    }
}