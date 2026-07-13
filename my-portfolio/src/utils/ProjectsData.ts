import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./../firebase";

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

export async function getProjectsData() {
  try {
    return await getDocs(collection(db, "projects"));
  } catch (error) {
    console.error("Failed to load projects data:", error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as Omit<Project, "id">) };
    }

    return null;
  } catch (error) {
    console.error("Failed to load project by id:", error);
    return null;
  }
}

export async function getProjectsToFrontend() {
  try {
    const q = query(
      collection(db, "projects"),
      where("showOnFrontend", "==", true),
    );
    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return projects;
  } catch (error) {
    console.error("Failed to load frontend projects:", error);
    return [];
  }
}
