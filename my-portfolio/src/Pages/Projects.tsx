import React, { useEffect, useState } from "react";
import { getProjectsToFrontend } from "../utils/ProjectsData";
import { useNavigate } from "react-router-dom";

type Project = {
  id: string;
  projectName: string;
  projectDescription: string;
  projectCategory: string;
  showOnFrontend: boolean;
  projectMedia?: string[];
  projectHighlights?: string[];
  projectLink?: string;
};

const categoryLabels: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-development": "Mobile Development",
  "mechanical-design": "Mechanical Design",
  academic: "Academic",
};

const isVideoUrl = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("web-development");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const isProjectsPage = location.pathname === "/projects";
    if (isProjectsPage) {
      document.title = "Projects Page - Marcus Lebanon Elioma";
    }

    async function fetchProjects() {
      const data = await getProjectsToFrontend();
      console.log("Fetched projects:", data);
      setProjects(data as Project[]);
    }

    fetchProjects();
  }, []);

  // group projects by category
  const grouped = projects.reduce(
    (acc, project) => {
      const cat = project.projectCategory;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );

  // pagination per category
  const activeProjects = grouped[activeTab] || [];
  const totalPages = Math.ceil(activeProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = activeProjects.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .project-card {
          transition: all 0.3s ease;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          margin-bottom: 2rem;
          padding: 1rem;
        }
        .project-card.glass-hover:hover {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transform: translateY(-5px);
        }
        .tabs {
          display: flex;
          gap: 0.75rem;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding: 0.5rem 0.25rem;
          min-height: 3.5rem;
          align-items: center;
          -webkit-overflow-scrolling: touch;
        }
        .tabs::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          flex: 0 0 auto;
          margin: 0;
          padding: 0.65rem 0.95rem;
          border: none;
          cursor: pointer;
          background: #eee;
          border-radius: 6px;
          white-space: nowrap;
        }
        .tab-btn.active {
          background: #333;
          color: #fff !important;
        }
        .card {
          background: rgba(255,255,255,0.8);
          padding: 1rem;
          border-radius: 8px;
        }
        .project-card .col {
          width: 100%;
        }
        .img {
          width: 100%;
          min-height: 320px;
          overflow: hidden;
          border-radius: 8px;
        }
        .img img,
        .img video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 8px;
        }
        .img video {
          max-width: 100%;
        }
        .project-pagination {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .project-pagination .btn-group {
          display: inline-flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .project-pagination button {
          padding: 0.75rem 1rem;
          background: #fff;
          border: 1px solid #333;
          border-radius: 8px;
          color: #333;
          cursor: pointer;
          min-width: 64px;
        }
        .project-pagination button.active,
        .project-pagination button:hover:not(:disabled) {
          background: #333;
          color: #fff;
        }
        .project-pagination button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>

      <section className="hero fade-in">
        <h1 className="big-intro">My Works</h1>
        <i className="bi bi-arrow-down-right-square text-black"></i>
      </section>

      <section className="spotlight fade-in">
        <div className="tabs" style={{ overflowX: "scroll" }}>
          {Object.keys(categoryLabels).map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeTab === cat ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat);
                setCurrentPage(1);
              }}
              data-tab={cat}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="tab-content active" id={activeTab}>
          <h2>{categoryLabels[activeTab]} Projects</h2>
          <p>Details about {categoryLabels[activeTab]} projects...</p>

          {paginatedProjects.map((project, idx) => (
            <div
              key={project.id}
              className="row project-card fade-in glass-hover"
              onClick={() => navigate(`/project-detail/${project.id}`)}
              style={{ cursor: "pointer" }}
            >
              {idx % 2 === 0 ? (
                <>
                  <div className="col">
                    <div className="card">
                      <h2>{project.projectName}</h2>
                      {project.projectHighlights && (
                        <ul>
                          {project.projectHighlights.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                          {project.projectLink && (
                            <li style={{ listStyle: "none" }}>
                              <a
                                className="text-primary"
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.projectLink}
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    {project.projectMedia &&
                      project.projectMedia.length > 0 && (
                        <div className="img">
                          {isVideoUrl(project.projectMedia[0]) ? (
                            <video
                              controls
                              muted
                              playsInline
                              preload="metadata"
                            >
                              <source src={project.projectMedia[0]} />
                              Your browser does not support this video.
                            </video>
                          ) : (
                            <img
                              src={project.projectMedia[0]}
                              alt={project.projectName}
                            />
                          )}
                        </div>
                      )}
                  </div>
                </>
              ) : (
                <>
                  <div className="col">
                    {project.projectMedia &&
                      project.projectMedia.length > 0 && (
                        <div className="img">
                          {isVideoUrl(project.projectMedia[0]) ? (
                            <video
                              controls
                              muted
                              playsInline
                              preload="metadata"
                            >
                              <source src={project.projectMedia[0]} />
                              Your browser does not support this video.
                            </video>
                          ) : (
                            <img
                              src={project.projectMedia[0]}
                              alt={project.projectName}
                            />
                          )}
                        </div>
                      )}
                  </div>
                  <div className="col">
                    <div className="card">
                      <h2>{project.projectName}</h2>
                      {project.projectHighlights && (
                        <ul>
                          {project.projectHighlights.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                          {project.projectLink && (
                            <li style={{ listStyle: "none" }}>
                              <a
                                className="text-primary"
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.projectLink}
                              </a>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="project-pagination">
              <div className="btn-group">
                <button
                  className={`btn ${currentPage === 1 ? "disabled" : ""}`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  &lt;&lt; Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`btn ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={`btn ${currentPage === totalPages ? "disabled" : ""}`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
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
