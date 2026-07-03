import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { Project } from "../types";

const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};

const fetchProjectById = async (id: string): Promise<Project> => {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data;
};

const createProject = async (project: Project): Promise<Project> => {
  const { data } = await axiosInstance.post("/projects", project);
  return data;
};

const updateProject = async ({
  id,
  project,
}: {
  id: string;
  project: Project;
}): Promise<Project> => {
  const { data } = await axiosInstance.put(`/projects/${id}`, project);
  return data;
};

const deleteProject = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}`);
};

export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: fetchProjects });

export const useProjectDetails = (id: string) =>
  useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};
