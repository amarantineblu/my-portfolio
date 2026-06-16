import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaProjectDiagram, FaCogs } from "react-icons/fa";

const AdminSideBar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <nav id="sidebar" className="col-md-2 d-md-block bg-dark sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/">
              <FaHome className="sidebar-icon" />
              {!collapsed && <span className="ms-2 sidebar-text">Dashboard</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/visitors">
              <FaUsers className="sidebar-icon" />
              {!collapsed && <span className="ms-2 sidebar-text">Visitors</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/projects">
              <FaProjectDiagram className="sidebar-icon" />
              {!collapsed && <span className="ms-2 sidebar-text">Projects</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/settings">
              <FaCogs className="sidebar-icon" />
              {!collapsed && <span className="ms-2 sidebar-text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminSideBar;
