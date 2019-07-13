import { FoodGroupsService } from './services/foodGroups.service';
import { CategoriesService } from './../core/services/categories.service';
import { RecipeItem } from './../common/models/recipe-item';
import { ProductsData } from './../common/models/product/productsData';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { RecipesData } from '../common/models/recipe/recipesData';
import { Product } from '../common/models/product/product';
import { Recipe } from '../common/models/recipe/recipe';
import { RecipeHelperService } from './services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { NotificatorService } from '../core/services/notificator.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeCategories: string[] = [];
  productFoodGroups: string[] = [];

  searchedItems: string;
  foundProducts: ProductsData;
  foundRecipes: RecipesData;
  addedProducts: Product[] = [];
  addedRecipes: Recipe[] = [];


  constructor(
    private readonly productsService: ProductsService,
    private readonly recipesService: RecipesService,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly categoriesService: CategoriesService,
    private readonly foodGroupsService: FoodGroupsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificator: NotificatorService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.recipeCategories = [...data.categories];
        this.productFoodGroups = [...data.foodGroups];
      },
    );

    // this.categoriesService.getCategories().subscribe(
    //   (categories) => this.recipeCategories = [...categories],
    // );
    // this.foodGroupsService.getFoodGroups().subscribe(
    //   (foodGroups) => this.productFoodGroups = [...foodGroups],
    // );
  }

  findItems(search: {items: string, inputValue: string, selectedValue: string}) {
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

  getFoundProducts() {
    return this.foundProducts;
  }

  getFoundRecipes() {
    return this.foundRecipes;
  }

  addToRecipe(item) {
    if (item.itemType === 'products') {
      this.addedProducts.push(item.item);
      console.log('addedproducts', this.addedProducts);
    }
    if (item.itemType === 'recipes') {
      this.addedRecipes.push(item.item);
    }
  }

  deleteItem(item: RecipeItem) {
    let itemIndex = this.addedProducts.indexOf(item);
    if (itemIndex > -1) {
      this.addedProducts.splice(itemIndex, 1);
      console.log('addedproducts', this.addedProducts);
    } else {
      itemIndex = this.addedRecipes.indexOf(item);
      if (itemIndex > -1) {
        this.addedRecipes.splice(itemIndex, 1);
      }
    }
  }

  createRecipe(recipe) {
    const title = recipe.title;
    const imageUrl = recipe.imageUrl;
    const category = recipe.category;
    const notes = recipe.notes;
    const newIngredientsData = [];
    const newSubrecipesData = [];

    recipe.items.forEach(item => {
      const newIngredient = this.addedProducts.find((product) => product.code === item.recipeItem);
      if (newIngredient) {
        newIngredientsData.push({productCode: +item.recipeItem, quantity: item.quantity, unit: item.unit});
      }
      const newSubrecipe = this.addedRecipes.find((rec) => rec.id === item.recipeItem);
      if (newSubrecipe) {
        newSubrecipesData.push({recipeId: item.recipeItem, quantity: +item.quantity, unit: item.unit});
      }
    });

    console.log('newReipeDTO', {title, imageUrl, category, notes, newIngredientsData, newSubrecipesData});
    this.recipesService.createRecipe({title, imageUrl, category, notes, newIngredientsData, newSubrecipesData}).subscribe(
      () => this.notificator.success('Recipe successfully created')
    );
  }
}
