import { Recipe } from './recipe';

export interface RecipesData {
  recipes: Recipe[];
  page: number;
  itemCount: number;
  totalItems: number;
  next?: string;
  previous?: string;
}
