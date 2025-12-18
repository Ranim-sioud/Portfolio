import { useParams } from "react-router-dom";
import info from "../info.json";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = info.content.dashboard_grid.projects_list.list[id];

  if (!project) return <p>Projet introuvable</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
      <p className="text-lg mb-6">{project.metric}</p>
      {project.link && (
        <a href={project.link} className="text-blue-600 underline">
          Voir le projet
        </a>
      )}
    </div>
  );
}