
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import {db} from './../../firebase';
import {getProjectsData} from './../../utils/ProjectsData';


const ProjectsAdminPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  
  useEffect( ()=>{
    const fetchProjects = async () => {
      const querySnapshot = await getProjectsData();
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(data);
    };
    fetchProjects();

  }, [])
 

  const navigate = useNavigate();



  return (
  <>
  <div className="container mt-5">
    <div className="card mb-4">
      <div className="card-header">
        <i className="bi bi-folder"></i> My Projects
        <Link to='/admin/addprojectspage' className="btn btn-sm justify-self-end"><i className="bi bi-clipboard-plus"></i> Add New Project </Link>
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
              <td><span className="badge text-white bg-success">{project.projectStatus}</span>
              </td>
              <td>
              {project.createdAt?.toDate
                ? project.createdAt.toDate().toLocaleDateString()
                : ""}
              </td>              
              <td className="btn-group">
                <button  onClick={() => navigate(`/admin/projects/${project.id}`)} className="btn btn-sm me-2 btn-outline-success"><i className="bi bi-eye"></i></button>
                <button onClick={() => navigate(`/admin/delete-project/${project.id}`)}  className="btn btn-sm me-2 btn-outline-danger"><i className="bi bi-x"></i></button>
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