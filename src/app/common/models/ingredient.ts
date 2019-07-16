import { Measure } from './measure';
import { Nutrition } from './nutrition';

export interface Ingredient {
  id: string;
  product: string;
  measures: Measure[];
  unit: string;
  quantity: number;
  nutrition: Nutrition;
  isDeleted?: boolean;
}
