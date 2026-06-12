import {NavLink, Link, Location, Outlet } from "react-router-dom";
import { useEffect } from "react";
import AdminNavBar from "../Components/Admin/AdminNavBar";
import AdminSideBar from "../Components/Admin/AdminSideBar";
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
        }
        body {
          font-family: "SUSE" !important;
        }
        #sidebar {
          min-height: 100vh;
          background-color: #343a40;
          transition: all 0.3s;
          width: auto;
        }
        #sidebar .nav-link {
          color: #fff !important;
        }
        #sidebar .nav-link.active {
          background-color: #495057 !important;
        }
        #sidebar.collapsed {
          margin-left: -250px;
        }
        #content {
          padding: 20px;
          transition: margin-left 0.3s;
        }
        #content.expanded {
          margin-left: 0;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.15); /* translucent */
          border-radius: 16px;
          backdrop-filter: blur(10px); /* frosted glass effect */
          -webkit-backdrop-filter: blur(10px); /* Safari support */
          border: 1px solid rgba(255, 255, 255, 0.3); /* subtle border */
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* soft shadow */
          padding: 20px;
          color: #fff; /* text stands out on translucent bg */
        }
        
      `}</style>
      <AdminNavBar />

      <div className="d-flex">
        <AdminSideBar />
        <main className="flex-grow-1" id="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
