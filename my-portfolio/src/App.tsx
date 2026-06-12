// import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GuestLayout from "./Layouts/GuestLayout";
import AdminLayout from "./Layouts/AdminLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Experiences from "./Pages/Experiences";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register"

import ProtectedRoute from "./Components/ProtectedRoute";
// import {Helmet, HelmetProvider} from 'react-helmet-async'
// @ts-ignore
import "./assets/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "./Pages/ProjectDetail";
import DashboardPage from "./Pages/Admin/DashboardPage";
import { DatabaseSync } from "node:sqlite";
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="project-detail" element={<ProjectDetail />} />
          <Route path="project-detail/:id" element={<ProjectDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
