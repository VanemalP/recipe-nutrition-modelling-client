import { Nutrition } from './nutrition';

export interface Subrecipe {
  id: string;
  recipe: string;
  unit: string;
  quantity: number;
  nutrition: Nutrition;
}
