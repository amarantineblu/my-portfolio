import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, Project as ProjectType } from "../utils/ProjectsData";

// Reuse the shared project type to ensure consistent typing.
type Project = ProjectType;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Project ID is missing from the URL.");
      setLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        const data = await getProjectById(id);
        if (!data) {
          setError("Project not found.");
        } else {
          setProject(data as Project);
          document.title = `${data.projectName || "Project Detail"} | Marcus Lebanon Elioma`;
        }
      } catch (err) {
        console.error(err);
        setError("There was a problem loading the project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const renderMediaItem = (media: string, index: number) => {
    const isVideo = /\.(mp4|webm|ogg)$/i.test(media);
    return (
      <div key={index} className="media-item">
        {isVideo ? (
          <video controls preload="metadata">
            <source src={media} />
            Your browser does not support this video.
          </video>
        ) : (
          <img
            src={media}
            alt={project?.projectName || `Project media ${index + 1}`}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="spotlight project-detail">
        <div className="card">
          <h2>Loading project details...</h2>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="spotlight project-detail">
        <div className="card">
          <h2>{error || "Project detail unavailable."}</h2>
          <p>Please go back and choose another project.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="spotlight project-detail">
      <style>{`
        .project-detail {
          padding: 2rem;
          gap: 3rem;
        }
        .project-detail .detail-grid {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 1.4fr;
          gap: 2rem;
          align-items: start;
          width: 100%;
        }
        .project-detail .summary-card {
          width: 100%;
          padding: 2rem;
          background-color: rgba(255,255,255,0.9);
          border-radius: 1rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .project-detail h1 {
          margin-bottom: 0.5rem;
          font-size: clamp(2rem, 2.6vw, 3rem);
        }
        .project-detail .project-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .project-detail .meta-badge {
          background: rgba(51, 50, 76, 0.1);
          color: #333;
          border-radius: 999px;
          padding: 0.5rem 0.9rem;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .project-detail .project-description {
          line-height: 1.8;
          color: #333;
        }
        .project-detail .project-highlights {
          list-style: disc;
          margin-left: 1.25rem;
          color: #222;
          line-height: 1.7;
        }
        .project-detail .project-link {
          color: #1f3b7b;
          text-decoration: none;
          font-weight: 600;
        }
        .project-detail .project-link:hover {
          text-decoration: underline;
        }
        .project-detail .media-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .project-detail .media-section h2 {
          margin: 0;
          font-size: 1.8rem;
        }
        .project-detail .media-grid {
          column-count: 4;
          column-gap: 1rem;
          width: 100%;
        }
        .project-detail .media-item {
          display: inline-flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 1rem;
          break-inside: avoid-column;
          overflow: hidden;
          border-radius: 1rem;
          background: #f8f8ff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .project-detail .media-item img,
        .project-detail .media-item video {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .project-detail .project-summary-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (max-width: 980px) {
          .project-detail .detail-grid {
            grid-template-columns: 1fr;
          }
          .project-detail .media-grid {
            column-count: 2;
          }
        }
        @media (max-width: 640px) {
          .project-detail .media-grid {
            column-count: 1;
          }
        }
      `}</style>

      <div className="detail-grid">
        <div className="summary-card">
          <div>
            <span className="meta-badge">
              {project.projectCategory || "Uncategorized"}
            </span>
            {project.projectStatus && (
              <span className="meta-badge">{project.projectStatus}</span>
            )}
          </div>

          <div className="project-summary-block">
            <h1>{project.projectName || "Project Detail"}</h1>
            <p className="project-description">
              {project.projectDescription ||
                "This project entry does not include a full description yet, but it is part of the showcase and contains media, status, and highlights."}
            </p>
          </div>

          {project.projectLanguages && (
            <div>
              <h3>Technologies</h3>
              <p>{project.projectLanguages}</p>
            </div>
          )}

          {project.projectHighlights &&
            project.projectHighlights.length > 0 && (
              <div>
                <h3>Project Highlights</h3>
                <ul className="project-highlights">
                  {project.projectHighlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

          {project.projectLink && (
            <div>
              <h3>Live Link</h3>
              <a
                className="project-link"
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
              >
                {project.projectLink}
              </a>
            </div>
          )}
        </div>

        <div className="media-section">
          <div>
            <h2> Media</h2>
          </div>

          {project.projectMedia && project.projectMedia.length > 0 ? (
            <div className="media-grid">
              {project.projectMedia.map(renderMediaItem)}
            </div>
          ) : (
            <div className="card">
              <p>No media is available for this project yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
