import { Nutrition } from './nutrition';

export interface Ingredient {
  id: string;
  product: string;
  unit: string;
  quantity: number;
  nutrition: Nutrition;
}
