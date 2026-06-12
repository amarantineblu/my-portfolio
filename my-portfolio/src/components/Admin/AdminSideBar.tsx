import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <nav id="sidebar" className="col-md-2 d-md-block bg-dark sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/admin/">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/visitors">
              <i className="fas fa-users"></i> Visitors
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/projects">
              <i className="fas fa-folder"></i> Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/settings">
              <i className="fas fa-cogs"></i> Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default AdminSideBar;