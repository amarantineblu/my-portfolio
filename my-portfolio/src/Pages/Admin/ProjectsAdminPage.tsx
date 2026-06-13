import Form, { FormField } from "../../components/Form";
const ProjectsAdminPage: React.FC = () => {
  const fields: FormField[] = [
    {
      name: "Project Category",
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
      name: "Project Name",
      label: "Project Name",
      type: "text",
      placeholder: "Enter Full Name",
      required: true,
    },
    {
      name: "Project Languages",
      label: "Project Languages",
      type: "text",
      placeholder: "Enter Project Languages",
      required: true,
    },
    {
      name: "Project Status",
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
      name: "Project Link",
      label: "Project Link",
      type: "text",
      placeholder: "Enter Project Link",
      required: false,
    },
    {
      name: "Project Images or Videos",
      label: "Project Image or Video",
      type: "file",
      placeholder: "Enter Project Image or Video URL",
      required: true,
    },
    {
      name: "Project Tags",
      label: "Project Tags",
      type: "text",
      placeholder: "Enter Project Tags (comma separated)",
      required: false,
    },

    {
      name: "Project Description",
      label: "Project Description",
      type: "textarea",
      placeholder: "Enter Project Description",
      required: true,
    },
  ];

  const handleSubmit = (values: Record<string, string>) => {
    console.log("Project submitted:", values);
    // Here you would typically send the data to your backend API
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Projects Management</h1>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-plus"></i> Add New Project
        </div>
        <div className="card-body">
          <Form fields={fields} onSubmit={handleSubmit} submitLabel="" />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <i className="fas fa-folder"></i> Existing Projects
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Portfolio Website</td>
                <td>A personal portfolio to showcase my work.</td>
                <td>
                  <span className="badge bg-success">Completed</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>Attendance Manager</td>
                <td>A web app to manage attendance for events.</td>
                <td>
                  <span className="badge bg-warning">In Progress</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdminPage;
