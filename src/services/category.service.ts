import type { Category } from "../types/category/category.model";
import api from "../api/api";

export async function CategoryService(): Promise<Category[] | undefined> {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
