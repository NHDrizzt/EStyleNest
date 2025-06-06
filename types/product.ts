export interface Inventory {
  sku: string;
  color: string;
  list_price: number;
  sale_price: number;
  sold: number;
  stock: number;
  discount_percentage: number;
  size: string;
}

export interface ProductData {
  data: Product[];
}

export interface Product {
  product_id: number;
  name: string;
  images: {
    color: string;
    image_url: string;
  }[];
  inventory: Inventory[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  info: Info[];
}

export interface Info {
  title: string;
  description: string[];
}
