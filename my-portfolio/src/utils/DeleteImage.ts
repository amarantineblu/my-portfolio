import { collection, getDocs, doc, getDoc , updateDoc} from "firebase/firestore";
import {db} from './../firebase';
import { v4 as uuid } from "uuid";


type Project = {
  projectMedia?: string[];
};

import supabase from "./../supabase"; // centralized client
export async function deleteImage (projectId:string,publicUrl:string,project:Project){

  const bucketName = "projects-images";
  const parts = publicUrl.split(`${bucketName}/`);
  const filePath = parts[1]; // e.g. "6NTLzFxO6kVqX6I1XVMf/image1.png"
  const { data, error } = await supabase.storage
  .from(bucketName) // bucket name
  .remove([filePath]);
  if (error) {
    console.error("Error deleting image:", error);
    return;
  }

  console.log("Image deleted:", filePath);

  
  // Update Firestore to remove the deleted URL
  const projectRef = doc(db, "projects", projectId);
  const newMedia = (project.projectMedia || []).filter((url: string) => url !== publicUrl);
  await updateDoc(projectRef, { projectMedia: newMedia });

}