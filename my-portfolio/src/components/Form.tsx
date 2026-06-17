import React, { useState } from "react";

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
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !tags.includes(tag)) {
        const newTags = [...tags, tag];
        setTags(newTags);
        setInputValue(newTags.join("\n")); // show tags stacked in textarea
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...values, projectTags: tags });
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
                {field.name === "projectTags" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    placeholder="Type a tag and press Enter"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
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
                    accept="images/*"
                    multiple
                    name={field.name}
                    className="form-control"
                    required={field.required}
                    onChange={handleChange}
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
