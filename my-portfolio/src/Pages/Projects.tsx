import React, { useEffect, useState } from "react";
import { getProjectsToFrontend } from "../utils/ProjectsData";

type Project = {
  id: string;
  projectName: string;
  projectDescription: string;
  projectCategory: string; // <-- match Firestore field
  showOnFrontend: boolean;
  projectMedia?: string[];
  projectHighlights?: string[];
  projectLink?: string;
};

const categoryLabels: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-development": "Mobile Development",
  "mechanical-design": "Mechanical Design",
  "academic": "Academic",
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("web-development");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  useEffect(() => {
    const isProjectsPage = location.pathname === "/projects";
    if (isProjectsPage) {
      document.title = "Projects Page - Marcus Lebanon Elioma";
    }

    async function fetchProjects() {
      const data = await getProjectsToFrontend();
      setProjects(data as Project[]);
    }

    fetchProjects();
  }, []);

  // group projects by projectCategory
  const grouped = projects.reduce((acc, project) => {
    const cat = project.projectCategory;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // pagination logic
  const activeProjects = grouped[activeTab] || [];
  const totalPages = Math.ceil(activeProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = activeProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  return (
    <>
      <section className="hero">
        <h1 className="big-intro">My Works</h1>
        <i className="bi bi-arrow-down-right-square text-black"></i>
      </section>

      <section className="spotlight">
        <div className="tabs">
          {Object.keys(categoryLabels).map(cat => (
            <button
              key={cat}
              className={`tab-btn ${activeTab === cat ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat);
                setCurrentPage(1); // reset pagination when switching tabs
              }}
              data-tab={cat}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="tab-content active" id={activeTab}>
          <h2>{categoryLabels[activeTab]} Projects</h2>

          {paginatedProjects.map(project => (
            <div key={project.id} className="row">
              <div className="col">
                <div className="card">
                  <h2>{project.projectName}</h2>
                  {project.projectHighlights && (
                    <ul>
                      {project.projectHighlights.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                      <li style={{listStyle:'none'}}><a className="text-primary" href={project.projectLink}> {project.projectLink}</a></li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="col">
                {project.projectMedia && project.projectMedia.length > 0 && (
                  <div className="img">
                    <img src={project.projectMedia[0]} alt={project.projectName} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="row">
              <div className="btn-group">
                <button
                  className="btn btn-outline-dark"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  &lt;&lt; Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn btn-outline-dark ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="btn btn-outline-dark"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next &gt;&gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
