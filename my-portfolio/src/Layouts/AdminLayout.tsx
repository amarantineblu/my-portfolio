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
      #sidebar {
        min-height: 100vh;
        background: linear-gradient(180deg, #212529, #343a40);
        transition: width 0.3s ease;
        width: 250px;
        overflow: hidden;
      }
      
      #sidebar .nav-link {
        color: #adb5bd;
        padding: 12px 20px;
        display: block;
        transition: background 0.2s, color 0.2s;
      }
      
      #sidebar .nav-link:hover {
        background-color: #495057;
        color: #fff;
      }
      
      #sidebar .nav-link.active {
        background-color: #0d6efd;
        color: #fff !important;
        border-radius: 6px;
      }
      
      /* Collapsed sidebar */
      #sidebar.collapsed {
        width: 70px;
      }
      
      #content {
        padding: 20px;
        transition: margin-left 0.3s ease;
        margin-left: 250px;
      }
      
      #content.expanded {
        margin-left: 70px;
      }
      
      /* Glass card */
      .glass-card {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        padding: 24px;
        color: #212529;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .glass-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
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
