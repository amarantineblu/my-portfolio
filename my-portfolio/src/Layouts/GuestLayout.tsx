import { useState } from 'react';
import {Outlet, Link} from 'react-router-dom'
export default function GuestLayout(){
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
        <Link className="nav-link " aria-current="page" to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/experiences">Portfolio</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects">Projects</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact">Contact</Link>
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