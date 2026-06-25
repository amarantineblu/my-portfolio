import { collection, getDocs, doc, getDoc , updateDoc} from "firebase/firestore";
import {db} from './../firebase';
import supabase from "../supabase";

type Project = {
  projectMedia?: string[];
};
 export async function addNewImage (files: FileList, projectId: string, project: Project) {
    const bucketName = "projects-images";
    const uploadedUrls: string[] = [];
  
    for (const file of Array.from(files)) {
      const filePath = `${projectId}/${file.name}`;
  
      // Upload to Supabase
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true });
  
      if (error) {
        console.error("Upload error:", error);
        continue;
      }
  
      // Get public URL
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      uploadedUrls.push(data.publicUrl);
    }
  
    // Update Firestore with new URLs
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      projectMedia: [...(project.projectMedia || []), ...uploadedUrls],
    });
    window.location.reload();
  };