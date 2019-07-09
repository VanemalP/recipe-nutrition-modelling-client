import { Ingredient } from '../ingredient';
import { Subrecipe } from '../subrecipe';
import { Nutrition } from '../nutrition';

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  notes: string;
  measure: string;
  amount: number;
  created: Date;
  category: string;
  ingredients?: Ingredient[];
  subrecipes?: Subrecipe[];
  nutrition: Nutrition;
}
