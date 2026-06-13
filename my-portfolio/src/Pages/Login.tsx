import React from "react";
import Form, { FormField } from "../components/Form";
import { login } from "../Controllers/authController";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const fields: FormField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your Email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      required: true,
    },
  ];

  const handleLogin = async (values: Record<string, string>) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/admin");
    } catch {
      alert("Login failed");
    }
  };

  return <Form fields={fields} onSubmit={handleLogin} submitLabel="Sign In" />;
};

export default Login;
