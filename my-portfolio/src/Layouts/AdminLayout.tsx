import { Outlet } from "react-router-dom";
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
        body {
          font-family: Arial, sans-serif;
        }
        #sidebar {
          min-height: 100vh;
          background-color: #343a40;
          transition: all 0.3s;
        }
        #sidebar .nav-link {
          color: #fff;
        }
        #sidebar .nav-link.active {
          background-color: #495057;
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
