import { Product } from './product';

export interface ProductsData {
  products: Product[];
  page: number;
  itemCount: number;
  totalItems: number;
  next?: string;
  previous?: string;
}
