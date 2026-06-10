import React from "react";

type SkillButtonProps = {
  skill: string;
  type: "icon" | "svg";
  iconOrImageString?: string;
  component?: React.ComponentType<{ size?: number }> | null;
};

export default function SkillButton({ skill, type, iconOrImageString, component: SvgComponent }: SkillButtonProps) {
  return (
    <div className={`skill-btn ${skill.toLowerCase()}`}>
      {type === "icon" ? (
        <i className={iconOrImageString}></i>
      ) : (
        SvgComponent ? <SvgComponent size={32} /> : null
      )}
    </div>
  );
}
