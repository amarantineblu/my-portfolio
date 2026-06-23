import React ,{useState} from "react"
import supabase from "../../supabase"; // centralized client
import { v4 as uuid } from "uuid";
import Form, { FormField } from "../../components/Form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../../firebase";
import { useNavigate, Link } from "react-router-dom";


const AddProjectsAdminPage: React.FC = () => {
  const navigate = useNavigate();
  
  const fields: FormField[] = [
    {
      name: "projectCategory",
      label: "Project Category",
      type: "select",
      options: [
        { value: "web-development", label: "Web Development" },
        { value: "mobile-development", label: "Mobile Development" },
        { value: "design", label: "Design" },
      ],
      required: true,
    },
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      placeholder: "Enter Full Name",
      required: true,
    },
    {
      name: "projectLanguages",
      label: "Project Languages",
      type: "text",
      placeholder: "Enter Project Languages",
      required: true,
    },
    {
      name: "projectStatus",
      label: "Project Status",
      type: "select",
      options: [
        { value: "completed", label: "Completed" },
        { value: "in-progress", label: "In Progress" },
        { value: "on-hold", label: "On Hold" },
      ],
      required: true,
    },
    {
      name: "projectLink",
      label: "Project Link",
      type: "text",
      placeholder: "Enter Project Link",
      required: false,
    },
    {
      name: "projectMedia",
      label: "Project Image or Video",
      type: "file",
      required: true,
    },
    {
      name: "projectHighlights",
      label: "Project Highlights",
      type: "bullets",
      placeholder: "Enter project highlights",
      required: false,
    },
    {
      name: "projectDescription",
      label: "Project Description",
      type: "textarea",
      placeholder: "Enter Project Description",
      required: true,
    },
  ];
  const handleSubmit = async (
    values: Record<string, any>,
    selectedFiles: File[],
    highlights: string[]
  ) => {
    try {
      // 🔐 Authenticate once here
      const { data: { user } } = await supabase.auth.getUser();
  
      // 📂 Upload files and collect public URLs
      const urls = await Promise.all(
        selectedFiles.map(async (file) => {
          const safeName = file.name
            .replace(/\s+/g, "_") // replace spaces
            .replace(/[^\w.-]/g, ""); // remove unsafe chars
          const fileName = `${uuid()}-${safeName}`;
  
          const { error: uploadError } = await supabase.storage
            .from("projects-images")
            .upload(fileName, file, { contentType: file.type });
  
          if (uploadError) {
            console.error("Upload error:", uploadError.message);
            return null;
          }
  
          // ✅ Extract the actual string from the object
          const { data } = supabase.storage
            .from("projects-images")
            .getPublicUrl(fileName);
  
          return data.publicUrl;
        })
      );
  
      // Filter out any nulls in case of upload errors
      const validUrls = urls.filter((url): url is string => !!url);
  
  
      // 🗄️ Save project in Firestore
      await addDoc(collection(db, "projects"), {
        ...values,
        projectMedia: validUrls,      // ✅ array of public URLs
        projectHighlights: highlights, // ✅ array of strings
        createdAt: new Date(),
      });
  
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h1 className="mb-4">Projects Management</h1>
          <i className="fas fa-plus"></i> Add New Project
        </div>
        <div className="card-body">
          <Form fields={fields} onSubmit={handleSubmit} submitLabel="Add New Project" />
        </div>
      </div>
    </div>
  )
}

export default AddProjectsAdminPage