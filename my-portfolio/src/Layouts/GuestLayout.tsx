import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import SkillButtonsContainer from "../Components/SkillButtonsContainer";

export default function GuestLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // clear existing classes
    document.body.className = "";

    // derive class from pathname
    const path =
      location.pathname === "/" ? "home" : location.pathname.replace("/", "");
    document.body.classList.add(path);
  }, [location]);

  // check if we're on the home page
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Only render SkillButtonsContainer on home page */}
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
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span
              id="menu-bar"
              className={`bi ${
                menuOpen
                  ? "bi-x-square-fill"
                  : "bi-menu-button-wide-fill"
              }`}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/experiences"
                >
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/projects"
                >
                  Projects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-sm"> <i className="bi bi-person-lock"></i></button>
          <button className="btn btn-sm"> <i className="bi bi-brightness-high"></i>  </button>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
