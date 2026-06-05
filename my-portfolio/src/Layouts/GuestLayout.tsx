import {Outlet, Link} from 'react-router-dom'
export default function GuestLayout(){
  return(
    <>
    <nav className="navbar navbar-expand-lg">
<div className="container-fluid">
  
  <Link className="navbar-brand" to="/index.html">Home</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span id="menu-bar" className="bi bi-menu-button-wide-fill"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/about.html">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " aria-current="page" to="/experiences.html">Portfolio</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/projects.html">Projects</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact.html">Contact</Link>
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