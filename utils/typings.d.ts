export interface Product {
  id: number;
  description: string;
  brand: string;
  category: string;
  title: string;
  discountPercentage: number;
  images: Array<string>[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}
