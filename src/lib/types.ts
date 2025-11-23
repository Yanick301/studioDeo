export type Category = {
  id: string;
  name: string;
  slug: string;
  imageId: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  imageId: string;
  galleryImageIds: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  popularity: number;
  createdAt: string;
};

export type Review = {
  id: string;
  author: string;
  authorImageId: string;
  rating: number;
  text: string;
  date: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  quantity: number;
  size: string;
  slug: string;
};
