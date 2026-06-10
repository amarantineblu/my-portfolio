// filepath: src/Components/SkillBtnDetails.d.ts
// ...existing code...
import { ComponentType } from "react";

export type SkillBtnEntry = {
  skill: string;
  type: "icon" | "svg";
  iconOrImageString?: string;
  component?: ComponentType<any>;
};

export const skillBtnDetails: SkillBtnEntry[];
export default skillBtnDetails;

// ...existing code...
