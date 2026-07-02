import React, { useEffect } from "react";
import Form, { FormField } from "../components/Form";
import { login } from "../Controllers/authController";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

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
      // Firebase login
      await signInWithEmailAndPassword(auth, values.email, values.password);

      // Supabase login
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      navigate("/admin");
    } catch {
      alert("Login failed");
    }
  };

  // 🔑 Logout automatically when the tab/browser closes
  useEffect(() => {
    const handleUnload = async () => {
      try {
        await auth.signOut();            // Firebase logout
        await supabase.auth.signOut();   // Supabase logout
      } catch (err) {
        console.error("Error signing out:", err);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return <Form fields={fields} onSubmit={handleLogin} submitLabel="Sign In" />;
};

export default Login;
