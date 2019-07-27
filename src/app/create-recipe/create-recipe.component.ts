import { Subscription } from 'rxjs';
import { ProductsData } from './../common/models/product/productsData';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from './services/products.service';
import { RecipesData } from '../common/models/recipe/recipesData';
import { Product } from '../common/models/product/product';
import { Recipe } from '../common/models/recipe/recipe';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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
  ingredientsNutrition: Nutrition;
  subrecipesNutrition: Nutrition;
  nutrition: Nutrition;
  measure: string;

  nutritionSubscription: Subscription;

  loading: boolean;

  @ViewChild('container', {static: false})
  container: ElementRef;

  constructor(
    private readonly productsService: ProductsService,
    private readonly recipesService: RecipesService,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly location: Location,
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
    this.recipeHelperService.clearRecipeItems();
    this.nutritionSubscription.unsubscribe();
  }

  findItems(search: {items: string, inputValue: string, selectedValue: string}) {
    this.loading = true;
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
          this.loading = false;
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
          this.loading = false;
        },
      );
    }
  }

  clearSearchResults(items) {
    if (items === 'products') {
      this.foundProducts = null;
    }
    if (items === 'recipes') {
      this.foundRecipes = null;
    }
  }

  addToRecipe(item) {
    if (item.itemType === 'products') {
      this.addedProducts.push(item.item);
      this.recipeHelperService.addProductToRecipe(item.item);
      window.scrollTo(0, this.container.nativeElement.scrollHeight);
    }
    if (item.itemType === 'recipes') {
      this.addedRecipes.push(item.item);
      this.recipeHelperService.addRecipeToRecipe(item.item);
      window.scrollTo(0, this.container.nativeElement.scrollHeight);
    }
  }

  deleteItem(data) {
    let productToDelete;
    let recipeToDelete;
    let itemIndex: number;

    if (data.item === 'product') {
      productToDelete = this.recipeHelperService.recipeIngredients[data.index];
      this.recipeHelperService.removeIngredientFromRecipe(data.index);
      if (this.addedProducts.length > 0) {
        itemIndex = this.addedProducts.findIndex((itm) => itm.code === productToDelete.code);
        if (itemIndex > -1) {
          this.addedProducts.splice(itemIndex, 1);
        }
      }

      if (this.oldProducts.length > 0) {
        itemIndex = this.oldProducts.findIndex((itm) => itm.id === productToDelete.id);
        if (itemIndex > -1) {
          this.oldProducts[itemIndex].isDeleted = true;
        }
      }
    }

    if (data.item === 'recipe') {
      recipeToDelete = this.recipeHelperService.recipeSubrecipes[data.index];
      this.recipeHelperService.removeSubrecipeFromRecipe(data.index);
      if (this.addedRecipes.length > 0) {
        itemIndex = this.addedRecipes.findIndex((itm) => itm.id === recipeToDelete.id);
        if (itemIndex > -1) {
          this.addedRecipes.splice(itemIndex, 1);
        }
      }

      if (this.oldRecipes.length > 0) {
        itemIndex = this.oldRecipes.findIndex((itm) => itm.id === recipeToDelete.id);
        if (itemIndex > -1) {
          this.oldRecipes[itemIndex].isDeleted = true;
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

    recipe.ingredients.forEach(item => {
      newIngredientsData.push({productCode: +item.recipeItem, quantity: item.quantity, unit: item.unit});
    });

    recipe.subrecipes.forEach(item => {
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

    recipe.ingredients.forEach(item => {
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

    recipe.subrecipes.forEach(item => {
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
        this.recipeHelperService.recipeToEdit = null;
        this.router.navigate([`/recipes/${res.id}`]);
      },
    );
  }

  changedValue(recipeData) {
    const nutrArr = [];
    let weight = 0;
    if (recipeData.ingredients.length > 0) {
      recipeData.ingredients.forEach((ingr) => {
        const product = this.addedProducts.find((prod) => ingr.recipeItem === prod.code) ||
          this.oldProducts.find((prod) => ingr.recipeItem === prod.id);
        const gramsPerMeasure = +ingr.unitOptions.find((unit) => unit.measure === ingr.unit).gramsPerMeasure;
        weight += gramsPerMeasure * ingr.quantity;
        const totalProductNutr = this.recipeHelperService.calculateTotalNutrition(product.nutrition, ingr.quantity, gramsPerMeasure);
        nutrArr.push(totalProductNutr);
      });
    }
    if (recipeData.subrecipes.length > 0) {
      recipeData.subrecipes.forEach((subrec) => {
        const recipe = this.addedRecipes.find((rec) => subrec.recipeItem === rec.id) ||
          this.oldRecipes.find((rec) => subrec.recipeItem === rec.id);
        weight += recipe.gramsPerMeasure * subrec.quantity;
        const totalRecipeNutr = this.recipeHelperService.calculateTotalNutrition(recipe.nutrition, subrec.quantity, recipe.gramsPerMeasure);
        nutrArr.push(totalRecipeNutr);
      });
    }
    const totalNutr = nutrArr.reduce((acc, curr) => {
      const nutrientNames = Object.keys(acc);
      nutrientNames.forEach((nutrientName: string) => {
        acc[nutrientName].value = +(acc[nutrientName].value + curr[nutrientName].value).toFixed(3);
        });
      return acc;
    }, this.recipeHelperService.createEmptyNutrition());
    this.recipeHelperService.changedNutritionValue(totalNutr, `${weight.toFixed(1)} g`);
  }

  cancelAction() {
    this.location.back();
  }
}
