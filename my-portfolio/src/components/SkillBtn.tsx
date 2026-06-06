export default function SkillBtn({skill, icon}: {skill: string, icon: string}){
  return(
    <div className="skill-btn">
      <img width="30" height="30" src={icon} alt={skill}/>
      <span>{skill}</span>
    </div>
  )
}