import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import {db} from './../firebase';

import supabase from "./../supabase"; // centralized client

export type Project = {
  id: string;
  projectName?: string;
  projectDescription?: string;
  projectCategory?: string;
  projectStatus?: string;
  projectLanguages?: string;
  projectLink?: string;
  projectMedia?: string[];
  projectHighlights?: string[];
};

const querySnapshot = await getDocs(collection(db, "projects"));

export async function getProjectsData() {  
  return querySnapshot;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as Omit<Project, "id">) };
  }

  return null;
}

export async function getProjectsToFrontend () {
  const q = query(collection(db, "projects"), 
  where("showOnFrontend", "==", true)); 
  const projects = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Frontend projects:", projects);
  return projects;
}