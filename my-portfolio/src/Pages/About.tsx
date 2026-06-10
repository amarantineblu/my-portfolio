// @ts-ignore
import aboutImg from '../assets/images/homeImg.jpeg'
import {useEffect} from 'react'
const About = () => {
  const isAboutPage = location.pathname === "/about";
  useEffect(() => {
    isAboutPage && (document.title = "About Page - Marcus Lebanon Elioma");
  },[]);
  return (
    <div className="about">
      <section className="hero">
    <h1 className="big-intro">About Me</h1>
    <div className="card about-hero-card">
      <h2> CORE SKILLS </h2>
      <ul>
        <li> <strong>Engineering & Design: </strong> SolidWorks, AutoCAD, Mechanical Design, Thermodynamics</li>
        <li> <strong> Software & Web Development: </strong> PHP, Laravel, Livewire, Flutter/Dart, React.js, React
          Native, API Development, DataTables, PostgreSQL/MySQL</li>
        <li> <strong> Testing & Debugging: </strong> Unit testing, API testing, dependency management</li>
        <li><strong>Productivity Tools: </strong> Microsoft Office Suite (Word, Excel, PowerPoint)</li>
        <li><strong>Soft Skills: </strong> Problem solving, Team Collaboration, Communication, Analytical Thinking</li>
      </ul>
    </div>
    <i className="bi bi-arrow-down-right-square text-black"></i>
  </section>
  <section className="about-section">
    <div className="container">
      <img className="about-img" src={aboutImg} alt=""  />
      <h3>Hello, I’m Marcus Lebanon Elioma, a developer and designer...</h3>
    </div>
  </section>

  <section className="spotlight">

          <div className="row">
            <div className="col">
              <div className="experience-detail">
                <h2 > Education </h2>
                <div className="row">
                  <div className="col">
                    <i className="bi bi-mortarboard-fill text-black"></i>
          
                  </div>
                  <div className="col">
                    <h3 >Bachelor of Technology (B.Tech), Mechanical Engineering </h3>
                    <p> 2023 </p>
                  </div>
                  <div className="col">
                    <p> Rivers State University| Nkpolu Oroworukwo| Port Harcourt - Nigeria. </p>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
          

          <div className="experience-detail">
            <h2> Certifications | Training | Personal Development | Professional Bodies </h2>
            <div className="row">
              <div className="col">
                <img width="48" height="48" src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/48/external-star-circle-medal-for-the-marine-corps-officers-badges-regular-tal-revivo.png" alt="external-star-circle-medal-for-the-marine-corps-officers-badges-regular-tal-revivo"/>
              </div>
              <div className="col">
                <h3 >National Youth Service Corps (NYSC) </h3>
                <p> 2025 </p>
              </div>
              <div className="col">
                <ul>
                  <li> Community Secondary Grammer School - Ibiaku Itam, Itu LGA, Akwa Ibom Nigeria.</li>
                  <li> Community Secondary Grammer School - Ikot Akpabio, Etinan LGA, Akwa Ibom Nigeria.</li>
                  <li> Community Secondary Grammer School - Ikot Itina, Etinan LGA, Akwa Ibom Nigeria.</li>

                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/solidworks.png" alt="solidworks"/>        </div>
              <div className="col">
                <h3 > SolidWorks® </h3>
                <p> 2022 - till date </p>
              </div>
              <div className="col">
                <ul>
                  <li> Self-directed projects</li>
                  <li> Academic Course work </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/flutter.png" alt="flutter"/> 
              </div>
              <div className="col">
                <h3 > Mobile Development (Flutter-Dart) </h3>
                <p> 2024 - till date </p>
              </div>
              <div className="col">
                <ul>
                  <li> Self-directed projects & contributions</li>
                  <li> Hands-on experience building scalable mobile apps with Flutter, emphasizing modular design and
                    performance </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <img width="40" height="40" src="https://img.icons8.com/dotty/80/react.png" alt="react"/>
              </div>
              <div className="col">
                <h3 > React Development </h3>
                <p> 2025 - till date </p>
              </div>
              <div className="col">
                <ul>
                  <li> Self-directed projects & contributions</li>
                  <li> Built interactive, component-based web applications with React.js, focusing on state management and
                    reusable UI design. </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/laravel.png" alt="laravel"/>
              </div>
              <div className="col">
                <h3 > Livewire (Laravel Framework) </h3>
                <p> 2025 - till date </p>
              </div>
              <div className="col">
                <ul>
                  <li> Self-directed projects & contributions</li>
                  <li> Developed dynamic, real-time web applications using Livewire, integrating seamlessly with Laravel
                    backends </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/html-5--v2.png" alt="html-5--v2"/>
              </div>
              <div className="col">
                <h3 > Front-End Web Development – Brainnest Consulting (Remote, Germany) </h3>
                <p> 2023 </p>
              </div>
              <div className="col">
                <ul>
                  <li>Focused on building responsive, accessible UIs with HTML, CSS, and JavaScript. </li>
                </ul>
              </div>
            </div>

          </div>
      </section>
    </div>
  )
};

export default About;