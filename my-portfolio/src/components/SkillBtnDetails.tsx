import React from "react";
// Suppress missing declaration file errors for these JS/JSX SVG components
// @ts-ignore: Module has no type declarations
import MechanicsIcon from "./SVG's/MechanicsIcon";
// @ts-ignore: Module has no type declarations
import FlutterIcon from "./SVG's/FlutterIcon";
// @ts-ignore: Module has no type declarations
import DartIcon from "./SVG's/DartIcon";
// @ts-ignore: Module has no type declarations
import SolidworksIcon from "./SVG's/SolidworksIcon";
// @ts-ignore: Module has no type declarations
import WordIcon from "./SVG's/WordIcon";
// @ts-ignore: Module has no type declarations
import ExcelIcon from "./SVG's/ExcelIcon";
// @ts-ignore: Module has no type declarations
import PowerpointIcon from "./SVG's/PowerpointIcon";
// @ts-ignore: Module has no type declarations
import LiveWire from "./SVG's/LiveWireIcon";

export const skillBtnDetails: { skill: string; type: string; iconOrImageString?: string; component?: React.ComponentType }[] = [
  { skill: "React", type: "icon", iconOrImageString: "devicon-react-original" },
  { skill: "Flutter", type: "svg", component: FlutterIcon },
  { skill: "Dart", type: "svg", component: DartIcon },
  { skill: "HTML", type: "icon", iconOrImageString: "devicon-html5-plain" },
  { skill: "CSS", type: "icon", iconOrImageString: "devicon-css3-plain" },
  {
    skill: "JavaScript",
    type: "icon",
    iconOrImageString: "devicon-javascript-plain",
  },
  {
    skill: "Laravel",
    type: "icon",
    iconOrImageString: "devicon-laravel-line colored",
  },
  {
    skill: "LiveWire",
    type: "icon",
    iconOrImageString: "devicon-livewire-plain colored",
  },
  {
    skill: "GitHub",
    type: "icon",
    iconOrImageString: "devicon-github-original",
  },
  // { skill: "LiveWire", type: "svg", component: LiveWire },

  { skill: "SolidWorks", type: "svg", component: SolidworksIcon },
  { skill: "Word", type: "svg", component: WordIcon },
  { skill: "Excel", type: "svg", component: ExcelIcon },
  { skill: "PowerPoint", type: "svg", component: PowerpointIcon },
  { skill: "Paint", type: "icon", iconOrImageString: "bi bi-brush" },
  {skill: 'Mechanics', type: 'icon', iconOrImageString:'bi bi-gear-wide'},

  {skill: 'PHP', type: 'icon', iconOrImageString:'bi bi-filetype-php'}
];
