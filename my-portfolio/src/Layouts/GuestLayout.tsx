import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import SkillButtonsContainer from "../components/SkillButtonsContainer";
import "./../assets/style.css";
import { useNavigate } from "react-router-dom";
import { logVisitor } from "./../utils/logVisitor";

export default function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    logVisitor(undefined, location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // clear existing classes
    document.body.className = "";

    // derive class from pathname
    const path =
      location.pathname === "/" ? "home" : location.pathname.replace("/", "");
    document.body.classList.add(path);

    // 🔑 close menu whenever route changes
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";

  return (
    <>
      {isHome && <SkillButtonsContainer />}

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              id="menu-bar"
              className={`bi ${menuOpen ? "bi-x-square-fill" : "bi-grid-1x2-fill"}`}
            ></span>
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/experiences">
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects">
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn-group p-2">
          <button className="btn btn-sm me-2 ">
            <i className="bi bi-person-lock "></i>
          </button>
          <button className="btn btn-sm me-2">
            <i className="bi bi-brightness-high"></i>
          </button>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
