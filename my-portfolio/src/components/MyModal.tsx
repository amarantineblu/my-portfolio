import React, {useState, useEffect} from 'react';
import { addNewImage } from "../utils/AddNewImage";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getProjectById } from '../utils/ProjectsData';



import { db } from "./../firebase";
import supabase from "../supabase";

type Project = {
  projectMedia?: string[];
  projectName?: string;
  projectCategory?: string;
  projectStatus?: string;
  projectLanguages?: string;
  projectDescription?: string;
  projectHighlights?: string[];
  projectLink?: string;
  showOnFrontend?: boolean;
  starred?: boolean;
  };
const MyModal:React.FC = () =>{
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(true);

    const handleClick = (field: string) => {
    setActiveField(field);
    setShowModal(true);
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

        if (!showModal) {
          return null;
        }
        
  const handleClose = () => {
    setShowModal(false);
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
  return (
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
                        onChange={(e) => {
                          if (e.target.files && project) {
                            addNewImage(e.target.files, id!, project);
                          }
                        }}
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
  )
}

export default MyModal;