import React from "react";

type SkillButtonProps = {
  skill: string;
  type: "icon" | "svg";
  iconOrImageString?: string;
  component?: React.ComponentType<{ size?: number }> | null;
};

export default function SkillButton({ skill, type, iconOrImageString, component: SvgComponent }: SkillButtonProps) {
  return (
    <button className={`btn btn-outline-primary ${skill.toLowerCase()}`}>
      {type === "icon" ? (
        <i className={iconOrImageString} style={{ fontSize: '2rem' }} ></i>
      ) : (
        SvgComponent ? <SvgComponent size={32} /> : null
      )}
    </button>
  );
}
