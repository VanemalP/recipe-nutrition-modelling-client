import { Recipe } from './recipe';

export interface RecipesData {
  items: Recipe[];
  page: number;
  itemCount: number;
  totalItems: number;
  next?: string;
  previous?: string;
}
