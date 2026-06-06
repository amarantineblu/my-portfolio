import { useEffect, useState } from 'react';
import {Outlet, Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {NavLink} from 'react-router-dom'
export default function GuestLayout(){
  const location = useLocation();

  useEffect(() => {
    // clear existing classes
    document.body.className = '';

    // derive class from pathname
    const path = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
    document.body.classList.add(path);
  }, [location]);
  const [menuOpen, setMenuOpen] = useState(false);

  return(
    <>
    <nav className="navbar navbar-expand-lg">
<div className="container-fluid">
  
  <Link className="navbar-brand" to="/">Home</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
    onClick={() => {
      setMenuOpen(!menuOpen);
    }}
    >
    <span id="menu-bar" className={`bi ${menuOpen ? 'bi-x-square-fill' : 'bi-menu-button-wide-fill'}`}></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to="/experiences">Portfolio</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to="/projects">Projects</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} aria-current="page" to="/contact">Contact</NavLink>
      </li>
    </ul>
  </div>
</div>
<div className="actions">
  <button className="btn btn-sm">Get A Quote</button>
</div>
</nav>

<main>
  <Outlet />
</main>
    </>
  )
}