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

      *{
        font-family: "SUSE" !important;
        font-weight: lighter !important;
      }
      
      body {
        background: #f4f6f9;
        color: #212529;
        margin: 0;
      }
      
      /* Sidebar */
      /* Sidebar base */
      #sidebar, .navbar {
        background-color: #0e274c !important; /* Bootstrap dark */
        color: #fff;
        position: fixed !important;
      }
      
      .container{
      position: relative;
      top: 5rem !important;
      }

      .navbar{
        width: 100%;
        height: 56px;
        border-radius: 50px;
        z-index: 1030; /* above sidebar */
      }
      
      #sidebar .nav-link.active{
        background: none !important;
        border: 2px solid white !important;
      }

      #sidebar {
        width: auto !important;
        transition: all 0.3s;
        min-height: 100vh;
      }

      #sidebar ul{
        list-style: none;
        margin: 8rem 0;
        }
      /* Nav links */
      #sidebar .nav-link {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
        color: #adb5bd;
        border-radius: 5px;
        padding: 0.75rem 1rem;
        transition: all 0.2s ease;
      }

      #sidebar ul li a.nav-link{
      color:#fff !important;
      }
      
      #sidebar .nav-link:hover {
        color: #fff;
        background-color: #343a40;
      }
      
      /* Icons */
      .sidebar-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
        fill: white !important;
      }
      
      /* Text labels */
      .sidebar-text {
        margin-left: 0.5rem;
        white-space: nowrap;
      }

      #sidebar.collapsed {
        max-width: auto !important;
      }
      /* Collapsed state: hide text */
      #sidebar.collapsed .sidebar-text {
        display: none;
      }
      
      /* Expanded state: show text */
      #sidebar:not(.collapsed) .sidebar-text {
        display: inline;
        color:white !important;
      }
      nav.navbar{
        margin: unset !important;
        }
      @media (max-width: 600px) {
      
        #sidebar.collapsed {
          position: fixed;
          top: 56px; /* below navbar */
          left: -200px;
        }

       
        #sidebar .sidebar-text {
          display: none !important;
        }
        #sidebar{
        width: auto !important;
        }
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
