import { Recipe } from './recipe/recipe';
import { Product } from './product/product';

export interface RecipeItem extends Product, Recipe{
}
