import { useState } from "react";
import {
  useProjects,
  useCreateProject,
  useDeleteProject,
} from "../../api/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { RootState } from "../../store";
import ProjectCard from "../Common/ProjectCard";
import Skeleton from "../Common/Skeleton";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectList: React.FC = () => {
  const { t } = useTranslation();
  const { data: projects, isLoading, refetch } = useProjects();
  const createMutation = useCreateProject();
  const deleteMutation = useDeleteProject();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    // 1. Birinchi navbatda ma'lumotlar qanday ketayotganini konsolda ko'ramiz
    console.log("Backendga yuborilayotgan ma'lumot:", {
      title,
      description,
      link,
    });

    createMutation.mutate({ title, description, link } as any, {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        setLink("");
        setShowForm(false);
        refetch();
      },
      onError: (err: any) => {
        console.error("Loyiha qo'shishda aniq xatolik:", err);
        // Agar xato bersa, ekranga ogohlantirish chiqaradi
        alert(
          "Xatolik yuz berdi: " + (err.response?.data?.message || err.message),
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 py-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm font-medium transition-colors"
        >
          <Plus size={18} /> {t("add_project")}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md space-y-4 max-w-xl mx-auto"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("project_title")}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("project_desc")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("project_link")}
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {createMutation.isPending ? "Saqlanmoqda..." : t("save")}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.length > 0 ? (
          projects.map((p: any) => (
            <ProjectCard
              key={p._id}
              project={p}
              isFav={favorites.some((f: any) => f._id === p._id)}
              onFavToggle={() => dispatch(toggleFavorite(p))}
              onDelete={() =>
                p._id &&
                deleteMutation.mutate(p._id, { onSuccess: () => refetch() })
              }
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">
            {t("no_projects")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
