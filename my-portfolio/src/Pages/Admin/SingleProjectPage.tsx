import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {getProjectById} from './../../utils/ProjectsData';


type Project = {
  projectMedia?: string[];
  projectName?: string;
  projectCategory?: string;
  projectStatus?: string;
  projectLanguages?: string;
  projectDescription?: string;
  projectHighlights?: string[];
  projectLink?: string;
};

type Props = {
  project?: Project;
};

const SingleProjectPage: React.FC<Props> = () => {
  const { id } = useParams(); // 👈 this retrieves the project ID from the URL
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id!);
      setProject(data as Project | null);
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return <p>Loading project...</p>;
  }

  console.log(project);
    return (
      <div
        className="card"
        style={{
          maxWidth: "600px",
          height: 'auto',
          margin: "20px auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Project Media */}
        {project.projectMedia &&
          project.projectMedia.map((media: string, index: number) => (
            <img
              key={index}
              src={media}
              alt={project.projectName}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            />
          ))}
  
        {/* Project Name */}
        <h2 style={{ marginBottom: "8px" }}>{project.projectName}</h2>
  
        {/* Category & Status */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <span
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            {project.projectCategory}
          </span>
          <span
            style={{
              background:
                project.projectStatus === "completed"
                  ? "#28a745"
                  : project.projectStatus === "in-progress"
                  ? "#ffc107"
                  : "#6c757d",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            {project.projectStatus}
          </span>
        </div>
  
        {/* Languages */}
        <p>
          <strong>Languages:</strong> {project.projectLanguages}
        </p>
  
        {/* Description */}
        <p style={{ marginTop: "12px" }}>{project.projectDescription}</p>
  
        {/* Highlights */}
        {project.projectHighlights && project.projectHighlights.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <h4>Highlights:</h4>
            <ul>
              {project.projectHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Project Link */}
        {project.projectLink && (
          <a
          className='btn btn-sm btn-outline-warning text-white'
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "8px 14px",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            View Project
          </a>
        )}
      </div>
    
  );
}

export default SingleProjectPage;