export default function AdminLayout () {
 return(
  <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <button className="btn btn-outline-light me-2" id="toggleSidebar">
        <img className="img-icon" width="50" height="50" src="https://img.icons8.com/ios/50/xbox-menu.png" alt="xbox-menu"/>      </button>
      <a className="navbar-brand" href="#">My Dashboard</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div className="d-flex">
    <nav id="sidebar" className="col-md-2 d-md-block bg-dark sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <a className="nav-link active" href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="fas fa-users"></i> Visitors</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="fas fa-folder"></i> Projects</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="fas fa-cogs"></i> Settings</a>
          </li>
        </ul>
      </div>
    </nav>

    <main id="content" className="flex-grow-1">
      <h1 className="mb-4">Dashboard Overview</h1>

      
      <div className="card text-bg-info mb-4">
        <div className="card-body">
          <h5 className="card-title"><i className="fas fa-users"></i> Visitors</h5>
          <p className="card-text fs-3">2,345</p>
        </div>
      </div>

      
      <div className="card">
        <div className="card-header">
          <i className="fas fa-folder"></i> My Projects
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
    </main>
  </div>

  </>
  
  

 )
}