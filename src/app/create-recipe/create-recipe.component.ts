import { Subscription } from 'rxjs';
import { ProductsData } from './../common/models/product/productsData';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './services/products.service';
import { RecipesData } from '../common/models/recipe/recipesData';
import { Product } from '../common/models/product/product';
import { Recipe } from '../common/models/recipe/recipe';
import { RecipeHelperService } from './services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from '../core/services/notificator.service';
import { Ingredient } from '../common/models/ingredient';
import { Subrecipe } from '../common/models/subrecipe';
import { Nutrition } from '../common/models/nutrition';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
  recipeCategories: string[] = [];
  productFoodGroups: string[] = [];

  searchedItems: string;
  foundProducts: ProductsData;
  foundRecipes: RecipesData;
  addedProducts: Product[] = [];
  addedRecipes: Recipe[] = [];
  oldProducts: Ingredient[] = [];
  oldRecipes: Subrecipe[] = [];
  recipeToEdit: Recipe;
  nutrition: Nutrition;
  measure: string;

  nutritionSubscription: Subscription;

  constructor(
    private readonly productsService: ProductsService,
    private readonly recipesService: RecipesService,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.recipeCategories = [...data.categories];
        this.productFoodGroups = [...data.foodGroups];
      },
    );

    this.recipeToEdit = this.recipeHelperService.recipeToEdit;
    if (this.recipeToEdit) {
      this.oldProducts = this.recipeToEdit.ingredients;
      this.oldRecipes = this.recipeToEdit.subrecipes;
    }

    this.nutritionSubscription = this.recipeHelperService.nutritionObs$.subscribe(
      (res) => {
        this.nutrition = res.nutr;
        this.measure = res.measure;
      },
    );
  }

  ngOnDestroy() {
    this.nutritionSubscription.unsubscribe();
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
      this.recipeHelperService.addProductToRecipe(item.item);
    }
    if (item.itemType === 'recipes') {
      this.addedRecipes.push(item.item);
      this.recipeHelperService.addRecipeToRecipe(item.item);
    }
  }

  deleteItem(index: any) {
    const itemToDelete = this.recipeHelperService.recipeProducts[index];
    this.recipeHelperService.removeProductFromRecipe(index);
    let itemIndex = this.addedProducts.findIndex((itm) => itm.code === itemToDelete.code);
    if (itemIndex > -1) {
      this.addedProducts.splice(itemIndex, 1);
    } else {
      itemIndex = this.addedRecipes.findIndex((itm) => itm.id === itemToDelete.id);
      if (itemIndex > -1) {
        this.addedRecipes.splice(itemIndex, 1);
      } else {
        itemIndex = this.oldProducts.findIndex((itm) => itm.id === itemToDelete.id);
        if (itemIndex > -1) {
          this.oldProducts[itemIndex].isDeleted = true;
        } else {
          itemIndex = this.oldRecipes.findIndex((itm) => itm.id === itemToDelete.id);
          if (itemIndex > -1) {
            this.oldRecipes[itemIndex].isDeleted = true;
          }
        }
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

    recipe.products.forEach(item => {
      newIngredientsData.push({productCode: +item.recipeItem, quantity: item.quantity, unit: item.unit});
    });

    recipe.recipes.forEach(item => {
      newSubrecipesData.push({recipeId: item.recipeItem, quantity: +item.quantity, unit: item.unit});
    });

    this.recipesService.createRecipe({title, imageUrl, category, notes, newIngredientsData, newSubrecipesData}).subscribe(
      (res: any) => {
        this.notificator.success('Recipe successfully created');
        this.recipeHelperService.clearRecipeItems();
        this.router.navigate([`/recipes/${res.id}`]);
      },
    );
  }

  updateRecipe(recipe) {
    const title = recipe.title;
    const imageUrl = recipe.imageUrl;
    const category = recipe.category;
    const notes = recipe.notes;
    const newIngredientsData = [];
    const newSubrecipesData = [];
    const updateIngredientsData = [];
    const updateSubrecipesData = [];

    recipe.products.forEach(item => {
      console.log('recipe product foreach', item);
      const newIngredient = this.addedProducts.find((prod) => prod.code === item.recipeItem);
      if (newIngredient) {
        newIngredientsData.push({productCode: +item.recipeItem, quantity: item.quantity, unit: item.unit});
      }
      const updateIngredient = this.oldProducts.find((ingr) => ingr.id === item.recipeItem);
      if (updateIngredient) {
        updateIngredientsData.push({id: item.recipeItem, quantity: item.quantity, unit: item.unit, isDeleted: item.isDeleted});
      }
    });

    this.oldProducts.forEach((prod) => {
      if (prod.isDeleted === true) {
        updateIngredientsData.push({id: prod.id, quantity: prod.quantity, unit: prod.unit, isDeleted: prod.isDeleted});
      }
    });

    recipe.recipes.forEach(item => {
      const newSubrecipe = this.addedRecipes.find((rec) => rec.id === item.recipeItem);
      if (newSubrecipe) {
        newSubrecipesData.push({recipeId: item.recipeItem, quantity: item.quantity, unit: item.unit});
      }
      const updateSubrecipe = this.oldRecipes.find((subrec) => subrec.id === item.recipeItem);
      if (updateSubrecipe) {
        updateSubrecipesData.push({id: item.recipeItem, quantity: item.quantity, unit: item.unit, isDeleted: item.isDeleted});
      }
    });

    this.oldRecipes.forEach((rec) => {
      if (rec.isDeleted === true) {
        updateSubrecipesData.push({id: rec.id, quantity: rec.quantity, unit: rec.unit, isDeleted: rec.isDeleted});
      }
    });

    this.recipesService.updateRecipe(this.recipeToEdit.id, {title, imageUrl, category, notes, newIngredientsData, newSubrecipesData, updateIngredientsData, updateSubrecipesData}).subscribe(
      (res: any) => {
        this.notificator.success('Recipe successfully updated');
        this.recipeHelperService.clearRecipeItems();
        this.router.navigate([`/recipes/${res.id}`]);
      },
    );
  }
}
