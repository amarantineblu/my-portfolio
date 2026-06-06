export default function AlertComponent ({message}: {message: string}){
 
return(
  <div id="autoAlert" className="alert bg-warning">
    {message}
    <i className="bi bi-x btn btn-sm btn-outline-dark "></i>
  </div>
);
}