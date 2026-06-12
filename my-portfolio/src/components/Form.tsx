import React, { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitLabel?: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel = "Submit" }) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
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
