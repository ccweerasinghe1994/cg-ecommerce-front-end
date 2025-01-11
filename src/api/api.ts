import { TCategory } from "@/categories/types";
import { axiosInstance } from "./axios";

export async function fetchCategories(): Promise<TCategory[]> {
  return (await axiosInstance.get("/public/categories")).data;
}

export async function createCategory(
  category: Omit<TCategory, "categoryId">
): Promise<string> {
  return (await axiosInstance.post("/public/categories", category)).data;
}

export async function deleteCategory(categoryId: number): Promise<string> {
  return (await axiosInstance.delete(`/public/categories/${categoryId}`)).data;
}

export async function updateCategory({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}): Promise<string> {
  return (
    await axiosInstance.put(`/public/categories/${categoryId}`, {
      categoryName,
    })
  ).data;
}
