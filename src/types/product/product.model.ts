export type ProductImage = {
  url: string;
  altText: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  discountPercentage: number;
  stock: number;
  category: string; // assuming this is a category ID
  tags: string[];
  images: ProductImage[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  __v: number;
};

export type PaginationMeta = {
  page: number;
  total: number;
  totalPages: number;
  limit: number;
};

export type PaginatedResponse = {
  products: Product[];
  pagination: PaginationMeta;
};
