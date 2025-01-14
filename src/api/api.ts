import { IApiResponse, TCategory } from "@/categories/types";
import { isAxiosError } from "axios";
import { axiosInstance } from "./axios";

async function delay(timeInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

export async function fetchCategories(
  pageNumber: number,
  pageSize: number = 8
): Promise<IApiResponse<TCategory[]>> {
  try {
    await delay(2000);
    return (
      await axiosInstance.get("/public/categories", {
        params: {
          pageNumber,
          pageSize,
          sortBy: "categoryId",
          sortDirection: "dsc",
        },
      })
    ).data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createCategory(
  category: Omit<TCategory, "categoryId">
): Promise<IApiResponse<TCategory>> {
  await delay(2000);
  try {
    return (await axiosInstance.post("/admin/categories", category)).data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteCategory(
  categoryId: number
): Promise<IApiResponse<string>> {
  try {
    await delay(2000);
    return (await axiosInstance.delete(`/admin/categories/${categoryId}`)).data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateCategory({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}): Promise<IApiResponse<TCategory>> {
  try {
    await delay(2000);
    return (
      await axiosInstance.put(`/admin/categories/${categoryId}`, {
        categoryName,
      })
    ).data;
  } catch (error) {
    handleApiError(error);
  }
}

function handleApiError(error: unknown): never {
  if (isAxiosError(error)) {
    throw {
      success: false,
      message: error.response?.data?.message ?? "Operation failed",
      status: error.response?.status,
      data: null,
    };
  }
  throw {
    success: false,
    message: "An unexpected error occurred",
    data: null,
  };
}
