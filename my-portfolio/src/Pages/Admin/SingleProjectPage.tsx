import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { getProjectById } from "./../../utils/ProjectsData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../../firebase";
import supabase from "../../supabase";

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

const SingleProjectPage: React.FC = () => {
const { id } = useParams();
const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

const [activeField, setActiveField] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const deleteImage = async (projectId:string,publicUrl:string,project:Project) => {

    const bucketName = "projects-images";
    const parts = publicUrl.split(`${bucketName}/`);
    const filePath = parts[1]; // e.g. "6NTLzFxO6kVqX6I1XVMf/image1.png"
    const { data, error } = await supabase.storage
    .from(bucketName) // bucket name
    .remove([filePath]);
    if (error) {
      console.error("Error deleting image:", error);
      return;
    }
  
    console.log("Image deleted:", filePath);

    
    // Update Firestore to remove the deleted URL
    const projectRef = doc(db, "projects", projectId);
    const newMedia = (project.projectMedia || []).filter((url) => url !== publicUrl);
    await updateDoc(projectRef, { projectMedia: newMedia });
  }

  const addNewImage = async (files: FileList, projectId: string, project: Project) => {
    const bucketName = "projects-images";
    const uploadedUrls: string[] = [];
  
    for (const file of Array.from(files)) {
      const filePath = `${projectId}/${file.name}`;
  
      // Upload to Supabase
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true });
  
      if (error) {
        console.error("Upload error:", error);
        continue;
      }
  
      // Get public URL
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      uploadedUrls.push(data.publicUrl);
    }
  
    // Update Firestore with new URLs
    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      projectMedia: [...(project.projectMedia || []), ...uploadedUrls],
    });
  };
    const handleClose = () => {
    setShowModal(false);
    setActiveField(null);
    };

    const handleClick = (field: string) => {
    setActiveField(field);
    setShowModal(true);
    };

    const handleKeyDown = async (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
      field: string
      ) => {
      if (e.key === "Enter") {
      e.preventDefault();
      if (!id) return;

      
      const value = (
        e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      ).value;
      const projectRef = doc(db, "projects", id);

      try {
      await updateDoc(projectRef, { [field]: value });
      console.log(`${field} updated successfully!`);

      // update local state so UI reflects change immediately
      setProject((prev) =>
      prev ? { ...prev, [field]: value } : prev
      );

      setShowModal(false);
      } catch (err) {
      console.error("Error updating project:", err);
      }
      }
      };

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

      return (
      <>
        <style>
          {
            ` .clickable {
              cursor: pointer !important;
            }

            .clickable:hover {
              background: yellow !important;
            }

            `
          }
        </style>

        {/* Modal */}
        {showModal && (
        <>
          <div className="modal d-block bg-body-secondary p-4 py-md-5">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                  <h1 className="fw-bold mb-0 fs-2">
                    Edit {activeField?.toUpperCase()}
                  </h1>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>

                <div className="modal-body p-5 pt-0">
                  <form>
                  {/* Category */}
{activeField === "projectCategory" && (
  <div className="form-floating mb-3">
    <select
      className="form-select rounded-3"
      defaultValue={project?.projectCategory}
      onKeyDown={(e) => handleKeyDown(e, "projectCategory")}
    >
      <option value="web-development">Web</option>
      <option value="mobile-development">Mobile</option>
      <option value="design">Design</option>
      <option value="other">Other</option>
    </select>
    <label htmlFor="editCategory">Category</label>
  </div>
)}

{/* Status */}
{activeField === "projectStatus" && (
  <div className="form-floating mb-3">
    <select
      className="form-select rounded-3"
      defaultValue={project?.projectStatus}
      onKeyDown={(e) => handleKeyDown(e, "projectStatus")}
    >
      <option value="completed">Completed</option>
      <option value="in-progress">In Progress</option>
      <option value="pending">Pending</option>
      <option value="on-hold">On Hold</option>

    </select>
    <label htmlFor="editStatus">Status</label>
  </div>
)}

                    {/* Languages */}
                    {activeField === "languages" && (
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control rounded-3" id="editLanguages"
                        defaultValue={project?.projectLanguages} onKeyDown={(e)=>
                      handleKeyDown(e, "projectLanguages")
                      }
                      />
                      <label htmlFor="editLanguages">Languages</label>
                    </div>
                    )}

 {/* Images */}
                    {activeField === "project-image" && (
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="form-control rounded-3"
                        id="addImage"
                        onChange={(e) => {if(e.target.files) {
                          addNewImage(e.target.files, id!, project)
                        }}}
                      />
                      <label htmlFor="editLanguages">Project Image</label>
                    </div>
                    )}

                    {/* Description */}
                    {activeField === "description" && (
                    <div className="form-floating mb-3">
                      <textarea className="form-control rounded-3" id="editDescription"
                        defaultValue={project?.projectDescription} onKeyDown={(e)=>
                            handleKeyDown(e, "projectDescription")
                          }
                        />
                        <label htmlFor="editDescription">Description</label>
                      </div>
                    )}

                    {/* Highlights */}
                    {activeField === "highlights" && (
                      <div className="mb-3">
                        <label className="form-label">Highlights</label>
                        <button type="button"
  className="btn btn-sm btn-outline-success"
  onClick={async () => {
    if (!id) return;

    // Take the current highlights (or an empty array if none exist)
    const newHighlights = [...(project?.projectHighlights || []), ""];

    // Update Firestore with the new array
    const projectRef = doc(db, "projects", id!);
    await updateDoc(projectRef, {
      projectHighlights: newHighlights,
    });

    // Update local state so React re-renders immediately
    setProject((prev) =>
      prev ? { ...prev, projectHighlights: newHighlights } : prev
    );
  }}
>
  <i className="bi bi-plus-circle-fill"></i>
</button>


                        {project?.projectHighlights?.map((highlight, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            defaultValue={highlight}
                            onKeyDown={async (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const inputs =
                                  document.querySelectorAll<HTMLInputElement>(
                                    ".form-control.mb-2"
                                  );
                                const newHighlights = Array.from(inputs).map(
                                  (input) => input.value
                                );
                                const projectRef = doc(db, "projects", id!);
                                await updateDoc(projectRef, {
                                  projectHighlights: newHighlights,
                                });
                                setProject((prev) =>
                                  prev
                                    ? { ...prev, projectHighlights: newHighlights }
                                    : prev
                                );
                                setShowModal(false);
                              }
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Card */}
      <div className="card"
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div className="card-header" style={{ display: "flex" }}>
          <h2>{project.projectName}</h2>
          <button
            onClick={() => handleClick("description")}
            className="btn btn-sm clickable"
          >
            <i className="bi bi-pen"></i>
          </button>
        </div>
        <div className="card-body">
          {/* Category & Status */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          {/* Category */}
<span
  className="clickable"
  onClick={() => handleClick("projectCategory")}
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

{/* Status */}
<span
  className="clickable"
  onClick={() => handleClick("projectStatus")}
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

          {/* Media */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              gap: ".5rem",
            }}
          >
            <div  className="d-flex align-items-center justify-content-center">
              <button style={{borderRadius:'50%'}} onClick={() => handleClick('project-image')} className=" clickable btn btn-l btn-success"><i className="bi bi-folder-plus text-white"></i></button>
            </div>
            {project.projectMedia?.map((media, index) => (
              <div key={index} style={{ gap: ".25rem" }}>
                <button type="button" className="btn" onClick={() => deleteImage(id!,media, project)} 
                style={{position: 'relative'}}>
                  <i className="bi bi-bookmark-x-fill text-danger"></i>
                </button>
                <img
                  src={media}
                  alt={project.projectName}
                  style={{
                    width: "auto",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "12px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Languages */}
          <p className="clickable" onClick={() => handleClick("languages")}>
            <strong>Languages:</strong> {project.projectLanguages}
          </p>

          {/* Description */}
          <p
            className="clickable"
            onClick={() => handleClick("description")}
            style={{ marginTop: "12px" }}
          >
            {project.projectDescription}
          </p>

          {/* Highlights */}
          {project.projectHighlights && project.projectHighlights.length > 0 && (
            <div
              className="clickable"
              onClick={() => handleClick("highlights")}
              style={{ marginTop: "12px" }}
            >
              <h4>Highlights:</h4>
              <ul>
                {project.projectHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProjectPage;