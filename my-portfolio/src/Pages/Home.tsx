import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import SkillButton from "../components/SkillBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const alertMessage = {
    message: "Please Drag Icons a little and paste wherever on the screen",
  };

  useEffect(() => {
    if (document?.body) {
      document.body.classList.add("home");
    }

    const isHomePage = location.pathname === "/";
    if (isHomePage) {
      document.title = "Personal Portfolio Website - Marcus Lebanon Elioma";
    }

    return () => {
      if (document?.body) {
        document.body.classList.remove("home");
      }
    };
  }, []);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        headline:
          "Laravel Livewire, Flutter/Dart, React, React Native, SolidWorks, MS Office tools.",
        description:
          "Experienced in building and debugging applications using strong analytical and problem solving abilities, with a passion for innovation in engineering and technology.",
        image:
          "https://res.cloudinary.com/xqjwb1sa/image/upload/v1783113128/IMG_7382_wykuka.jpg",
      });
      setLoading(false);
    }, 2000); // simulate 2s API delay
  }, []);

  // Replicate index.html behavior: random placement and draggable skill buttons
  useEffect(() => {
    const spotlight = document.querySelector(".spotlight") as HTMLElement;
    if (!spotlight) return;

    const skillButtons = Array.from(
      spotlight.querySelectorAll(".skill-btn"),
    ) as HTMLElement[];

    const rect = spotlight.getBoundingClientRect();
    // Random placement
    skillButtons.forEach((btn) => {
      const x = Math.random() * (rect.width - 100);
      const y = Math.random() * (rect.height - 100);
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    });

    // Make draggable with Pointer Events
    skillButtons.forEach((btn) => {
      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        (btn as HTMLElement).setPointerCapture(e.pointerId);

        const rect = btn.getBoundingClientRect();
        const shiftX = e.clientX - rect.left;
        const shiftY = e.clientY - rect.top;

        const onPointerMove = (ev: PointerEvent) => {
          btn.style.left = ev.pageX - shiftX + "px";
          btn.style.top = ev.pageY - shiftY + "px";
        };

        const onPointerUp = () => {
          btn.removeEventListener("pointermove", onPointerMove as any);
          btn.removeEventListener("pointerup", onPointerUp as any);
        };

        btn.addEventListener("pointermove", onPointerMove as any);
        btn.addEventListener("pointerup", onPointerUp as any);
      };

      btn.addEventListener("pointerdown", onPointerDown as any);
      btn.ondragstart = () => false;
      (btn as any).__onPointerDown = onPointerDown;
    });

    return () => {
      skillButtons.forEach((btn) => {
        const fn = (btn as any).__onPointerDown;
        if (fn) btn.removeEventListener("pointerdown", fn as any);
        btn.ondragstart = null as any;
      });
    };
  }, []);

  return (
    <>
      {
        loading ? 
        (
        <div className="spotlight">
        <div className="row" style={{ 'width': '100vw' }}>
          <div className="col">
            <div className="home-text">
              <h2 className="text-secondary">
                <Skeleton width={400} /> 
              </h2>
              <p>
                <Skeleton count={3} />
              </p>
            </div>
          </div>
          <div className="col">
            <div className="">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
        </div>

        )
        :
      (
        <>
        <Alert message={alertMessage.message} />
        <div className="spotlight">
          <div className="row">
            <div className="col">
              <div className="home-text">
                <h2 className="text-secondary">
                  {userData.headline}
                </h2>
                <p>
                  {
                    userData.description
                  }
                </p>
              </div>
            </div>
            <div className="col">
              <div className="hero-img">
                  <img
                    className="home-img"
                    src={userData.image}
                    alt="Profile"
                  />
                
              </div>
            </div>
          </div>
        </div>
        </>
      )
      
    }
    </>
    

  );
};

export default Home;
