import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getProjectById, getProjectsData } from "./../../utils/ProjectsData";
import { deleteImage } from "../../utils/DeleteImage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProjectsAdminPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getProjectsData();
      const data =
        querySnapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) ?? [];
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const navigate = useNavigate();

  const deleteProject = async (id: string) => {
    console.log("hello world");
    const project: any = await getProjectById(id);
    if (!project) return;

    // Delete all images
    const project_media = project.projectMedia || [];
    for (const mediaItem of project_media) {
      await deleteImage(id, mediaItem, project);
    }
    // Delete the Firestore document itself
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);

    console.log(`Project ${id} and all its images deleted successfully`);

    // Optional: refresh page so UI updates
    window.location.reload();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card mb-4">
          <div className="card-header">
            <i className="bi bi-folder"></i> My Projects
            <Link
              to="/admin/addprojectspage"
              className="btn btn-sm justify-self-end"
            >
              <i className="bi bi-clipboard-plus"></i> Add New Project{" "}
            </Link>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.projectName}</td>
                    <td>
                      <span
                        className={`badge text-white ${project.projectStatus === "completed" ? "bg-success" : project.projectStatus === "in-progress" ? "bg-secondary" : "bg-warning"}`}
                      >
                        {project.projectStatus}
                      </span>
                    </td>
                    <td>
                      {project.createdAt?.toDate
                        ? project.createdAt.toDate().toLocaleDateString()
                        : ""}
                    </td>
                    <td className="btn-group">
                      <button
                        onClick={() =>
                          navigate(`/admin/single-projects/${project.id}`)
                        }
                        className="btn me-2 btn-outline-success"
                      >
                        <i className="bi bi-file-earmark-zip-fill"></i>
                      </button>
                      <button
                        onClick={() => deleteProject(`${project.id}`)}
                        className="btn me-2 btn-outline-danger"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsAdminPage;
