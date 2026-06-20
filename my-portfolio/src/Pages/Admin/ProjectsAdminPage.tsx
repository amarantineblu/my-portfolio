import Form, { FormField } from "../../components/Form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../../firebase";

const ProjectsAdminPage: React.FC = () => {
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
      type: "bullets", // handled specially in Form
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

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      await addDoc(collection(db, "projects"), {
        ...values,
        projectHighlights: values.projectHighlights, // array of bullet points
        createdAt: new Date(),
      });
      console.log("Project submitted:", values);
    } catch (error) {
      console.error("Error adding Projects:", error);
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
      {/* Existing projects table remains unchanged */}
    </div>
  );
};

export default ProjectsAdminPage;
