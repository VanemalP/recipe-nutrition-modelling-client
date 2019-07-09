import { Product } from './product';

export interface ProductsData {
  items: Product[];
  page: number;
  itemCount: number;
  totalItems: number;
  next?: string;
  previous?: string;
}
