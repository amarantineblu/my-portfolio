import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {db} from './../firebase';

import supabase from "./../supabase"; // centralized client


export async function getProjectsData() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  
  return querySnapshot;
}

export async function getProjectById(id: string) {
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }

  return null;
}

