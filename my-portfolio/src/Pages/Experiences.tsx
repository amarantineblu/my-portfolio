const Experiences = () => {
  return (
    <>
     <section className="hero">
    <h1 className="big-intro"> Professional Experience </h1>
    <i className="bi bi-briefcase"></i>  
  </section>
  <section className="spotlight">
    <div className="experience-detail">
      <div className="row">
        <div className="col">
          <i className="bi bi-arrow-down-right-square text-black"></i>

        </div>
        <div className="col">
          <h2 >Frontend Developer (Intern) – Brainnest Consulting (Remote - Bremem) </h2>
          <p> Apr – May 2023 </p>
        </div>
        <div className="col">
          <ul>
            <li> Collaborated with a global team of developers in a structured remote internship. </li>
            <li> Built interactive UI components using HTML, CSS, and JavaScript. 
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="experience-detail">
      <div className="row">
        <div className="col">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/information--v1.png" alt="information--v1"/>
        </div>
        <div className="col">
          <h2 >ICT Assistant – School of Basic Studies, Ignatius Ajuru University  </h2>
          <p> 2023 – till date </p>
        </div>
        <div className="col">
          <ul>
            <li> Assisted in digital student registration and biometric data collection. </li>
            <li> Maintained records and verified identities for JUPEB/IJMB students.  
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
    </>
  )
};

export default Experiences;