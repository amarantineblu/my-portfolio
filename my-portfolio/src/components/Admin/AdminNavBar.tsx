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
      <button className="btn btn-outline-light me-2" id="toggleSidebar">
        <img className="img-icon" width="50" height="50" src="https://img.icons8.com/ios/50/xbox-menu.png" alt="xbox-menu"/>      </button>
      <a className="navbar-brand" href="#">My Dashboard</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
export default AdminNavBar;