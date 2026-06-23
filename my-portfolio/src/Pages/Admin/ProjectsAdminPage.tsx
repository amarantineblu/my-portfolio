
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import {db} from './../../firebase';
import getProjectsData from './../../utils/ProjectsData';


const ProjectsAdminPage: React.FC = () => {
  
  useEffect( ()=>{
    console.log('this is the query snapshot '+ getProjectsData);

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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Portfolio Website</td>
              <td><span className="badge bg-success">Completed</span></td>
              <td>2026-05-20</td>
            </tr>
            <tr>
              <td>Attendance Manager</td>
              <td><span className="badge bg-warning">In Progress</span></td>
              <td>2026-06-01</td>
            </tr>
            <tr>
              <td>Dashboard App</td>
              <td><span className="badge bg-info">Testing</span></td>
              <td>2026-06-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  </>
  );
  };

  export default ProjectsAdminPage;