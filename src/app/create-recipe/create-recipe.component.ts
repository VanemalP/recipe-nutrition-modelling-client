import { ProductsData } from './../common/models/product/productsData';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { RecipesService } from '../core/services/recipes.service';
import { RecipesData } from '../common/models/recipe/recipesData';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeCategories = ['Appetizers', 'Salads', 'Soups', 'Entrées', 'Desserts', 'Sides', 'Drinks'].sort();
  productFoodGroups = [
    'Dairy and Egg Products',
    'Spices and Herbs',
    'Baby Foods',
    'Fats and Oils',
    'Poultry Products',
    'Soups, Sauces, and Gravies',
    'Sausages and Luncheon Meats',
    'Breakfast Cereals',
    'Fruits and Fruit Juices',
    'Pork Products',
    'Vegetables and Vegetable Products',
    'Nut and Seed Products',
    'Beef Products',
    'Beverages',
    'Finfish and Shellfish Products',
    'Legumes and Legume Products',
    'Lamb, Veal, and Game Products',
    'Baked Products',
    'Sweets',
    'Cereal Grains and Pasta',
    'Fast Foods',
    'Meals, Entrees, and Side Dishes',
    'Snacks',
    'American Indian/Alaska Native Foods',
    'Restaurant Foods'
  ].sort();

  searchedItems: string;
  foundProducts: ProductsData;
  foundRecipes: RecipesData;

  constructor(
    private readonly productsService: ProductsService,
    private readonly recipesService: RecipesService,
  ) { }

  ngOnInit() {
  }

  getItems(search: {items: string, inputValue: string, selectedValue: string}) {
    let query;
    if (search.items === 'products') {
      query = {
        description: '',
        foodGroup: '',
      };
      query.description = search.inputValue;
      query.foodGroup = search.selectedValue;

      this.productsService.getProducts(query).subscribe(
        (productsData) => {
          this.foundProducts = productsData;
          this.searchedItems = search.items;
        },
      );

    }
    if (search.items === 'recipes') {
      query = {
        title: '',
        category: '',
      };
      query.title = search.inputValue;
      query.category = search.selectedValue;

      this.recipesService.getRecipes(query).subscribe(
        (recipesData) => {
          this.foundRecipes = recipesData;
          this.searchedItems = search.items;
        },
      );
    }
  }

  getFoundItems() {
    if (this.searchedItems === 'products') {
      return this.foundProducts;
    }
    if (this.searchedItems === 'recipes') {
      return this.foundRecipes;
    }
  }
}
