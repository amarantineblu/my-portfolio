import React, { useEffect } from "react";
import { skillBtnDetails } from "./SkillBtnDetails";
import SkillButton from "./SkillBtn";

const SkillButtonsContainer: React.FC = () => {
  useEffect(() => {
    const skillButtons = Array.from(
      document.querySelectorAll(".skill-btn-group"),
    ) as HTMLElement[];

    const clampPosition = (x: number, y: number, btn: HTMLElement) => {
      const margin = 16;
      const maxLeft = Math.max(margin, window.innerWidth - btn.offsetWidth - margin);
      const maxTop = Math.max(margin, window.innerHeight - btn.offsetHeight - margin);

      return {
        left: Math.min(Math.max(x, margin), maxLeft),
        top: Math.min(Math.max(y, margin), maxTop),
      };
    };

    const placeButton = (btn: HTMLElement) => {
      const x = Math.random() * (window.innerWidth - btn.offsetWidth - 32) + 16;
      const y = Math.random() * (window.innerHeight - btn.offsetHeight - 32) + 16;
      const { left, top } = clampPosition(x, y, btn);

      btn.style.left = `${left}px`;
      btn.style.top = `${top}px`;
      btn.style.position = "fixed";
      btn.style.zIndex = "1000";
    };

    const handleResize = () => {
      skillButtons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const { left, top } = clampPosition(rect.left, rect.top, btn);
        btn.style.left = `${left}px`;
        btn.style.top = `${top}px`;
      });
    };

    requestAnimationFrame(() => {
      skillButtons.forEach((btn) => placeButton(btn));
    });

    // Make draggable with Pointer Events
    skillButtons.forEach((btn) => {
      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        btn.setPointerCapture((e as PointerEvent).pointerId);

        const rect = btn.getBoundingClientRect();
        const shiftX = (e as PointerEvent).clientX - rect.left;
        const shiftY = (e as PointerEvent).clientY - rect.top;

        const onPointerMove = (ev: PointerEvent) => {
          const { left, top } = clampPosition(
            ev.clientX - shiftX,
            ev.clientY - shiftY,
            btn,
          );

          btn.style.left = `${left}px`;
          btn.style.top = `${top}px`;
        };

        const onPointerUp = () => {
          btn.removeEventListener("pointermove", onPointerMove as EventListener);
          btn.removeEventListener("pointerup", onPointerUp as EventListener);
        };

        btn.addEventListener("pointermove", onPointerMove as EventListener);
        btn.addEventListener("pointerup", onPointerUp as EventListener);
      };

      btn.addEventListener("pointerdown", onPointerDown as EventListener);
      btn.ondragstart = () => false;
      (btn as any).__onPointerDown = onPointerDown;
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      skillButtons.forEach((btn) => {
        const fn = (btn as any).__onPointerDown;
        if (fn) btn.removeEventListener("pointerdown", fn as EventListener);
        btn.ondragstart = null as any;
      });
    };
  }, []);

  // Utility to group array into chunks of 5
  const groupInFives = <T,>(arr: T[]): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += 5) {
      result.push(arr.slice(i, i + 5));
    }
    return result;
  };

  const groupedButtons = groupInFives(skillBtnDetails);

  return (
    <>
      {groupedButtons.map((group, groupIdx) => (
        <div key={groupIdx} className="btn-group skill-btn-group" style={{ margin: "10px" }}>
          {group.map((btn, idx) => (
            <SkillButton
              key={idx}
              skill={btn.skill}
              type={btn.type as "icon" | "svg"}
              component={btn.component}
              iconOrImageString={btn.iconOrImageString}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default SkillButtonsContainer;
