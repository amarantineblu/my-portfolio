import React, { useEffect } from "react";
import { skillBtnDetails } from "./SkillBtnDetails";
import SkillButton from "./SkillBtn";
import { log } from "console";

const SkillButtonsContainer: React.FC = () => {
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
      // ensure they are above nav
      btn.style.position = "absolute";
      btn.style.zIndex = "1000";
    });

    // Make draggable with Pointer Events
    skillButtons.forEach((btn) => {
      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        (btn as HTMLElement).setPointerCapture((e as any).pointerId);

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
      {skillBtnDetails.map((btn, idx) => (
        <SkillButton key={idx} skill={btn.skill} type={btn.type as "icon" | "svg"} component={btn.component} iconOrImageString={btn.iconOrImageString} />
      ))}
    </>
  );
};

export default SkillButtonsContainer;
