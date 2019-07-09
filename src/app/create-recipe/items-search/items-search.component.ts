import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsData } from '../../common/models/product/productsData';
import { RecipesData } from '../../common/models/recipe/recipesData';

@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.component.html',
  styleUrls: ['./items-search.component.css']
})
export class ItemsSearchComponent implements OnInit {
  @Input()
  foundItems: ProductsData | RecipesData;

  productDescription = 'Description';
  recipeTitle = 'Title';
  productSelectLabel = 'Food group';
  recipeSelectLabel = 'Category';
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
  recipeCategories = ['Appetizers', 'Salads', 'Soups', 'Entrées', 'Desserts', 'Sides', 'Drinks'].sort();
  constructor() { }

  ngOnInit() {
  }
}
