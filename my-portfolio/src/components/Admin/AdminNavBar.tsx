import { useEffect } from 'react';
const AdminNavBar = () => {
  useEffect(() => {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    const handleToggle = () => {
      if (sidebar && content) {
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('expanded');
      }
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleToggle);
    }

    return () => {
      if (toggleBtn) {
        toggleBtn.removeEventListener('click', handleToggle);
      }
    };
  },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      
      <a className="navbar-brand" href="#">My Dashboard</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
        </ul>
      </div>
    </div>
    <button className="btn btn-sm me-2" id="toggleSidebar">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
<path fill="#306263" d="M4,7h16c0.552,0,1-0.448,1-1V5c0-0.552-0.448-1-1-1H4C3.448,4,3,4.448,3,5v1C3,6.552,3.448,7,4,7z"></path><path fill="#306263" d="M4,13.5h16c0.552,0,1-0.448,1-1v-1c0-0.552-0.448-1-1-1H4c-0.552,0-1,0.448-1,1v1	C3,13.052,3.448,13.5,4,13.5z"></path><path fill="#306263" d="M4,20h16c0.552,0,1-0.448,1-1v-1c0-0.552-0.448-1-1-1H4c-0.552,0-1,0.448-1,1v1	C3,19.552,3.448,20,4,20z"></path>
</svg>        </button>
  </nav>
  )
}
export default AdminNavBar;