const Projects   = () => {
  return (
    <>
    <section className="hero">
      <h1 className="big-intro">My Works</h1>
      <i className="bi bi-arrow-down-right-square text-black"></i>
    </section>
    <section className="spotlight">
      <div className="tabs">
        <button className="tab-btn active" data-tab="web">Web Development</button>
        <button className="tab-btn" data-tab="mechanical">Mechanical Design</button>
        <button className="tab-btn" data-tab="academic">Academic</button>
      </div>
      <div className="tab-content active" id="web">
        <h2>Web Development Projects</h2>
        <p>Details about web development projects...</p>
        
      <div className="row">
        <div className="col">
          <div className="card">
            <h2>Blog React App </h2>
            <p>React.js, CSS, Mock REST API</p>
            <ul>
              <li>Built a responsive blog platform with product catalog, cart functionality, and checkout simulation.</li>
              <li>	Implemented reusable components, React hooks for state management, and WCAG-compliant markup.</li>
              <li> GitHub: github.com/amarantineblu/blog-react-app (github.com in Bing) | Live Demo</li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="img">
            <img
              src="assets/images/0394c8857780323dfdcd79d7c946ad72.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="img">
            <img
              src="assets/images/313d8f9c52cb3b3a40198fbec5e797e2.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <h2>SolidWorks Mechanical Design </h2>
            <p>(Academic & Freelance) </p>
            <ul>
              <li>Designed and modeled mechanical components and assemblies using SolidWorks.</li>
              <li>
                Produced detailed technical drawings for manufacturing and prototyping.
              </li> <li>
                Applied engineering principles to optimize designs for performance and cost.
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="row ">
        <div className="btn-group">
          <button className="btn btn-outline-dark">&lt;&lt; Prev </button>
          <button className="btn btn-outline-dark"> 1</button>
          <button className="btn btn-outline-dark"> 2 </button>
          <button className="btn btn-outline-dark"> &gt;&gt; Next</button>
       </div>
      </div>
      </div>
      
    </section>
    </>
  )
};

export default Projects ;