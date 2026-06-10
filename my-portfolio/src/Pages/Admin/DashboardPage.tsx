const DashboardPage = () => {
  return(
    <>
    <h1 className="mb-4">Dashboard Overview</h1>

      
<div className="card glass-card text-bg-info mb-4">
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
    </>
  )
}

export default DashboardPage;