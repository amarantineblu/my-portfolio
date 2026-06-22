import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from './../../supabase';
import { auth } from './../../firebase';
import { signOut } from 'firebase/auth';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error: supabaseError } = await supabase.auth.signOut();
      if (supabaseError) throw supabaseError;

      await signOut(auth);

      console.log("Logged out from both Supabase and Firebase");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      
      <Link className="navbar-brand" to='/' >My Dashboard</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
        </ul>
      </div>
      <div className="btn-group">
      <button className='btn btn-sm me-2' onClick={handleLogout} >
      <i className="bi bi-box-arrow-in-right"></i>
      </button>
      <button className="btn btn-sm me-2" id="toggleSidebar">
      <i className="bi bi-toggles"></i>      </button>
      </div>
      
    </div>
   
  </nav>
  )
}
export default AdminNavBar;