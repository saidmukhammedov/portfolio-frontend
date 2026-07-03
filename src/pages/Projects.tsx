import { useState } from "react";
import {
  useProjects,
  useCreateProject,
  useDeleteProject,
} from "../api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import { RootState } from "../store";
import ProjectCard from "../components/Common/ProjectCard";
import Skeleton from "../components/Common/Skeleton";
import { Plus, Search } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const [search, setSearch] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techInput, setTechInput] = useState("");

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 py-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} />
        ))}
      </div>
    );
  }

  const filtered = projects?.filter((p) => {
    const s = p.title.toLowerCase().includes(search.toLowerCase());
    const f = filterTech ? p.techStack.includes(filterTech) : true;
    return s && f;
  });

  const allTechs = Array.from(
    new Set(projects?.flatMap((p) => p.techStack) || []),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    createMutation.mutate(
      {
        title,
        description,
        techStack: techInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setTechInput("");
          setShowForm(false);
        },
      },
    );
  };

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold">Loyihalar</h2>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <select
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="">Barcha texnologiyalar</option>
            {allTechs.map((t) => (
              <option key={t} value={t} className="text-black">
                {t}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={18} /> Qo'shish
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-w-xl mx-auto space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Loyiha nomi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Tavsif</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Texnologiyalar (vergul bilan)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Node.js"
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md"
          >
            Saqlash
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {filtered?.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            isFav={favorites.some((f) => f._id === p._id)}
            onFavToggle={() => dispatch(toggleFavorite(p))}
            onDelete={() => p._id && deleteMutation.mutate(p._id)}
          />
        ))}
      </div>
    </div>
  );
}
