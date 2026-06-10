const AdminSideBar = () => {
  return (
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
  )
}
export default AdminSideBar;