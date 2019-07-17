import { Nutrition } from './nutrition';

export interface Subrecipe {
  id: string;
  recipe: string;
  unit: string;
  gramsPerMeasure: number;
  quantity: number;
  nutrition: Nutrition;
  isDeleted?: boolean;
}
