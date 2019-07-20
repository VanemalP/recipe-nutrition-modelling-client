import { Recipe } from './recipe';

export interface RecipesData {
  recipes: Recipe[];
  page: number;
  itemCount: number;
  totalRecipes: number;
  next?: string;
  previous?: string;
}
