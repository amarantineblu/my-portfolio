import { NavLink, Link, Location, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AdminNavBar from "../components/Admin/AdminNavBar";
import AdminSideBar from "../components/Admin/AdminSideBar";
import { Helmet } from "react-helmet-async";
export default function AdminLayout() {
  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.classList.add("flex-grow-1");
      mainEl.id = "content";
    }

    document.body.className = "dash";
  });
  return (
    <>
      <style>{`
      @font-face {
        font-family: "SUSE";
        src: url("./assets/fonts/SUSE/SUSE-VariableFont_wght.ttf") format("truetype");
        font-weight: 100 900; /* variable font range */
        font-display: swap;   /* ensures fallback until font loads */
      }
      
      body {
        font-family: "SUSE", Arial, sans-serif;
        background: #f4f6f9;
        color: #212529;
        margin: 0;
      }
      
      /* Sidebar */
      /* Sidebar base */
      #sidebar, .navbar {
        background-color: #0d6efd !important; /* Bootstrap dark */
        color: #fff;
      }
      
      #sidebar {
        max-width: 250px;
        transition: all 0.3s;
        min-height: 100vh;

      }
      /* Nav links */
      #sidebar .nav-link {
        display: flex;
        align-items: center;
        color: #adb5bd;
        padding: 0.75rem 1rem;
        transition: all 0.2s ease;
      }
      
      #sidebar .nav-link:hover {
        color: #fff;
        background-color: #343a40;
      }
      
      /* Icons */
      .sidebar-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      
      /* Text labels */
      .sidebar-text {
        margin-left: 0.5rem;
        white-space: nowrap;
      }
      
      /* Collapsed state: hide text */
      #sidebar.collapsed .sidebar-text {
        display: none;
      }
      
      /* Expanded state: show text */
      #sidebar:not(.collapsed) .sidebar-text {
        display: inline;
      }
      
      `}</style>
      <AdminNavBar />

      <div className="d-flex">
        <AdminSideBar collapsed={false} />
        <main className="flex-grow-1" id="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
