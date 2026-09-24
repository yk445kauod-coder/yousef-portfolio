import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "./portfolioData";

function ExternalLink({ project }: { project: Project }) {
  return <a href={project.link} target="_blank" rel="noreferrer" className="text-link">{project.cta} <ArrowUpRight size={15} /></a>;
}

export default function ProjectRail() {
  return (
    <div className="project-rail" aria-label="Selected projects, horizontally scrollable">
      {projects.map((project) => (
        <article className="project-card glass-card" key={project.title}>
          <div className="project-image">
            <img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" />
            <img className="project-frame-art" src={project.frame} alt="" aria-hidden="true" />
            <span className="project-number">{project.number}</span>
            <span className="live-pill"><span className="status-dot" /> LIVE</span>
          </div>
          <div className="project-info">
            <span className="eyebrow">{project.kind}</span>
            <div className="project-title-row"><h3>{project.title}</h3>{"logo" in project && <img className="project-logo" src={project.logo} alt={`${project.title} logo`} loading="lazy" />}</div>
            <p>{project.text}</p>
            <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <ExternalLink project={project} />
          </div>
        </article>
      ))}
      <span className="rail-hint">DRAG / SWIPE TO EXPLORE →</span>
    </div>
  );
}
