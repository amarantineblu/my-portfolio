import React , {useState} from "react";
import Form, { FormField } from "../Components/Form";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"



const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (values: Record<string, string>) => {
    try {
      const { email, password } = values;
      console.log("Registering user:", values);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
      navigate("/admin");
    } catch (err) {
      alert("Registration failed");
    }
  };

  const fields: FormField[] = [
    { name: "Full Name", label: "Full Name", type: "text", placeholder: "Enter Full Name", required: true },
    { name: "Phone Number", label: "Phone Number", type: "text", placeholder: "Enter Phone Number", required: true },

    { name: "email", label: "Email", type: "email", placeholder: "Enter email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password", required: true },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm password", required: true },
  ];

  const handleSubmit = async (values: Record<string, string>) => {
    setEmail(values.email);
    setPassword(values.password);
    await handleRegister(values);
    navigate("/admin"); // redirect to admin panel after successful registration
  };

  return <Form fields={fields} onSubmit={handleSubmit} submitLabel="Register" />;
};

export default Register;
