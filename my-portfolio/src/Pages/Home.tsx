import { useEffect } from "react";
import Alert from "../Components/Alert";
import myImg from "../assets/images/aboutImg.JPG.jpeg";
import SkillButton from "../Components/SkillBtn";
const Home = () => {
  const alertMessage = {
    message: "Please Drag Icons a little and paste wherever on the screen",
  };
  useEffect(() => {
    if (document?.body) {
      document.body.classList.add("home");
      return () => {
        document.body.classList.remove("home");
      };
    }
  }, []);

  // Replicate index.html behavior: random placement and draggable skill buttons
  useEffect(() => {
    const skillButtons = Array.from(
      document.querySelectorAll(".skill-btn"),
    ) as HTMLElement[];

    // Random placement
    skillButtons.forEach((btn) => {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 100);
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
    });

    // Make draggable with Pointer Events
    const handlers: Array<{
      btn: HTMLElement;
      onPointerMove: (e: PointerEvent) => void;
      onPointerUp: (e: PointerEvent) => void;
    }> = [];

    skillButtons.forEach((btn) => {
      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        (btn as HTMLElement).setPointerCapture(e.pointerId);

        const rect = btn.getBoundingClientRect();
        const shiftX = (e as PointerEvent).clientX - rect.left;
        const shiftY = (e as PointerEvent).clientY - rect.top;

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

        handlers.push({ btn, onPointerMove, onPointerUp });
      };

      btn.addEventListener("pointerdown", onPointerDown as any);
      btn.ondragstart = () => false;
      // store a cleanup reference on the element
      (btn as any).__onPointerDown = onPointerDown;
    });

    return () => {
      // cleanup listeners
      skillButtons.forEach((btn) => {
        const fn = (btn as any).__onPointerDown;
        if (fn) btn.removeEventListener("pointerdown", fn as any);
        btn.ondragstart = null as any;
      });
    };
  }, []);
  return (
    <>
      <Alert message={alertMessage.message} />
      <div className="spotlight">
        <div className="row">
          <div className="col">
            <div className="home-text">
              <h2 className="text-secondary">
                Laravel Livewire, Flutter/Dart, React, React Native,
                SolidWorks,MS Office tools.
              </h2>
              <p>
                Experienced in building and debugging applications using Strong
                analytical and problem solving abilities, with a passion for
                innovation in engineering and technology.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="hero-img">
              <svg
                width="0"
                height="0"
                viewBox="0 0 435 620"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="smoothBox" clipPathUnits="userSpaceOnUse">
                    <path
                      d="M419 0.5C427.56 0.5 434.5 7.4396 434.5 16V402.138C434.5 409.845 430.177 416.902 423.31 420.402L242.022 512.808C230.144 518.862 227.708 534.785 237.234 544.113L287.085 592.925C297.008 602.641 290.129 619.5 276.241 619.5H21C9.67816 619.5 0.5 610.322 0.5 599V16C0.5 7.43959 7.43959 0.500002 16 0.5H419ZM405.34 445.988C418.93 439.654 434.5 449.576 434.5 464.569V599C434.5 610.322 425.322 619.5 414 619.5H333.229C327.539 619.5 322.104 617.134 318.227 612.97L255.382 545.476C245.895 535.286 249.106 518.806 261.725 512.925L405.34 445.988Z"
                      stroke="black"
                    />
                  </clipPath>
                </defs>
              </svg>
              <img className="home-img" src={myImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
