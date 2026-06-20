import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase"; // assuming you export storage from firebase.ts

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  submitLabel?: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel = "Submit" }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(storage, `projects/${uuid()}-${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );
      setValues({ ...values, projectMedia: urls });
    }
  };

  const handleHighlightKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && highlightInput.trim() !== "") {
      e.preventDefault();
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...values, projectHighlights: highlights });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div className="mb-3" key={field.name}>
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                </label>
                {field.name === "projectHighlights" ? (
                  <div>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      placeholder="Type a highlight and press Enter"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={handleHighlightKeyDown}
                    />
                    <ul className="mt-2">
                      {highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                  />
                ) : field.type === "file" ? (
                  <input
                    type="file"
                    id={field.name}
                    accept="image/*,video/*"
                    multiple
                    name={field.name}
                    className="form-control"
                    required={field.required}
                    onChange={handleFileChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    placeholder={field.placeholder}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-warning text-white w-100">
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
