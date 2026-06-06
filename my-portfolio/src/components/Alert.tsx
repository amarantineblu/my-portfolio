import { useEffect } from "react";
export default function AlertComponent ({message}: {message: string}){
 useEffect(() => {
  setTimeout(() => {
    const alert = document.getElementById('autoAlert');
    if (alert) {
      // Use Bootstrap's built-in dismiss animation
      alert.classList.remove('show');
      alert.classList.add('fade');
    }
  }, 2500);
 }, [])
return(

  <div id="autoAlert" className="alert bg-warning">
    {message}
    <i className="bi bi-x btn btn-sm btn-outline-dark "></i>
  </div>
);
}