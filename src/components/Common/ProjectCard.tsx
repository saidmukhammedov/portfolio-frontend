import { Project } from "../../types";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

interface CardProps {
  project: Project;
  isFav: boolean;
  onFavToggle: () => void;
  onDelete: () => void;
}

export default function ProjectCard({
  project,
  isFav,
  onFavToggle,
  onDelete,
}: CardProps) {
  return (
    <div className="border rounded-xl p-5 flex flex-col justify-between bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
      <div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Link
          to={`/projects/${project._id}`}
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Batafsil
        </Link>
        <div className="flex gap-2">
          <button
            onClick={onFavToggle}
            className={`p-1.5 rounded-md border ${isFav ? "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30" : "text-gray-400 border-gray-200 dark:border-gray-700"}`}
          >
            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-md border text-gray-400 border-gray-200 dark:border-gray-700 hover:text-red-500 hover:border-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
