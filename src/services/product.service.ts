import type { PaginatedResponse } from "../types/product/product.model";
import api from "../api/api";

export async function getPaginatedData(
  page?: number,
  limit?: number
): Promise<PaginatedResponse | undefined> {
  const params: Record<string, unknown> = {};

  if (page !== undefined) params.page = page;
  if (limit !== undefined) params.limit = limit;

  try {
    const response = await api.get("/product", { params });
    return response.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
