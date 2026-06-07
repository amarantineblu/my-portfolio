// import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GuestLayout from "./Layouts/GuestLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Experiences from "./Pages/Experiences";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
// import {Helmet, HelmetProvider} from 'react-helmet-async'
// @ts-ignore
import "./assets/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "./Pages/ProjectDetail";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
