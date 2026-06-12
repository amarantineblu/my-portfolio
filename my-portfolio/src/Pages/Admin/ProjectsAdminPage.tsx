const ProjectsAdminPage: React.FC = () => {
  return (
    <div className="container mt-5">  
      <h1 className="mb-4">Projects Management</h1>
      <div className="card mb-4">
        <div className="card-header"> 
          <i className="fas fa-plus"></i> Add New Project
        </div>
        <div className="card-body"> 
          <form>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">Project Name</label>  
              <input type="text" className="form-control" id="projectName" placeholder="Enter project name" />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">Description</label>
              <textarea className="form-control" id="projectDescription" rows={3} placeholder="Enter project description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="projectStatus" className="form-label">Status</label>
              <select className="form-select" id="projectStatus">
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="testing">Testing</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Project</button>
          </form>
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
                <td><span className="badge bg-success">Completed</span></td>
                <td>
                  <button className="btn btn-sm btn-warning me-2"><i className="fas fa-edit"></i> Edit</button>
                  <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i> Delete</button>
                </td>   
              </tr>
              <tr>
                <td>Attendance Manager</td>
                <td>A web app to manage attendance for events.</td>
                <td><span className="badge bg-warning">In Progress</span></td>
                <td>
                  <button className="btn btn-sm btn-warning me-2"><i className="fas fa-edit"></i> Edit</button>
                  <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i> Delete</button>
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