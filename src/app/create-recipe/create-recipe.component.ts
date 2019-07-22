import { Subscription } from 'rxjs';
import { ProductsData } from './../common/models/product/productsData';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './services/products.service';
import { RecipesData } from '../common/models/recipe/recipesData';
import { Product } from '../common/models/product/product';
import { Recipe } from '../common/models/recipe/recipe';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
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
  ingredientsNutrition: Nutrition;
  subrecipesNutrition: Nutrition;
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
    this.recipeHelperService.clearRecipeItems();
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
    }
    if (item.itemType === 'recipes') {
      this.addedRecipes.push(item.item);
      this.recipeHelperService.addRecipeToRecipe(item.item);
    }
  }

  deleteItem(data) {
    let productToDelete;
    let recipeToDelete;
    let itemIndex: number;

    if (data.item === 'product') {
      productToDelete = this.recipeHelperService.recipeProducts[data.index];
      this.recipeHelperService.removeProductFromRecipe(data.index);
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
      recipeToDelete = this.recipeHelperService.recipeRecipes[data.index];
      this.recipeHelperService.removeRecipeFromRecipe(data.index);
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
        const nutrientNames = Object.keys(product.nutrition);
        const totalProductNutr = {
          PROCNT: {
            description: 'Protein',
            unit: 'g',
            value: 0,
          },
          FAT: {
            description: 'Total lipid (fat)',
            unit: 'g',
            value: 0,
          },
          CHOCDF: {
            description: 'Carbohydrate, by difference',
            unit: 'g',
            value: 0,
          },
          ENERC_KCAL: {
            description: 'Energy',
            unit: 'kcal',
            value: 0,
          },
          SUGAR: {
            description: 'Sugars, total',
            unit: 'g',
            value: 0,
          },
          FIBTG: {
            description: 'Fiber, total dietary',
            unit: 'g',
            value: 0,
          },
          CA: {
            description: 'Calcium, Ca',
            unit: 'mg',
            value: 0,
          },
          FE: {
            description: 'Iron, Fe',
            unit: 'mg',
            value: 0,
          },
          P: {
            description: 'Phosphorus, P',
            unit: 'mg',
            value: 0,
          },
          K: {
            description: 'Potassium, K',
            unit: 'mg',
            value: 0,
          },
          NA: {
            description: 'Sodium, Na',
            unit: 'mg',
            value: 0,
          },
          VITA_IU: {
            description: 'Vitamin A, IU',
            unit: 'IU',
            value: 0,
          },
          TOCPHA: {
            description: 'Vitamin E (alpha-tocopherol)',
            unit: 'mg',
            value: 0,
          },
          VITD: {
            description: 'Vitamin D',
            unit: 'IU',
            value: 0,
          },
          VITC: {
            description: 'Vitamin C, total ascorbic acid',
            unit: 'mg',
            value: 0,
          },
          VITB12: {
            description: 'Vitamin B-12',
            unit: 'µg',
            value: 0,
          },
          FOLAC: {
            description: 'Folic acid',
            unit: 'µg',
            value: 0,
          },
          CHOLE: {
            description: 'Cholesterol',
            unit: 'mg',
            value: 0,
          },
          FATRN: {
            description: 'Fatty acids, total trans',
            unit: 'g',
            value: 0,
          },
          FASAT: {
            description: 'Fatty acids, total saturated',
            unit: 'g',
            value: 0,
          },
          FAMS: {
            description: 'Fatty acids, total monounsaturated',
            unit: 'g',
            value: 0,
          },
          FAPU: {
            description: 'Fatty acids, total polyunsaturated',
            unit: 'g',
            value: 0,
          },
        };
        nutrientNames.forEach((nutrientName: string) => {
          const nutrValue = product.nutrition[nutrientName].value / 100 * ingr.quantity * gramsPerMeasure;
          totalProductNutr[nutrientName].value = nutrValue;
        });
        nutrArr.push(totalProductNutr);
      });
    }
    if (recipeData.subrecipes.length > 0) {
      recipeData.subrecipes.forEach((subrec) => {
        const recipe = this.addedRecipes.find((rec) => subrec.recipeItem === rec.id) ||
          this.oldRecipes.find((rec) => subrec.recipeItem === rec.id);
        weight += recipe.gramsPerMeasure * subrec.quantity;
        const nutrientNames = Object.keys(recipe.nutrition);
        const totalRecipeNutr = {
          PROCNT: {
            description: 'Protein',
            unit: 'g',
            value: 0,
          },
          FAT: {
            description: 'Total lipid (fat)',
            unit: 'g',
            value: 0,
          },
          CHOCDF: {
            description: 'Carbohydrate, by difference',
            unit: 'g',
            value: 0,
          },
          ENERC_KCAL: {
            description: 'Energy',
            unit: 'kcal',
            value: 0,
          },
          SUGAR: {
            description: 'Sugars, total',
            unit: 'g',
            value: 0,
          },
          FIBTG: {
            description: 'Fiber, total dietary',
            unit: 'g',
            value: 0,
          },
          CA: {
            description: 'Calcium, Ca',
            unit: 'mg',
            value: 0,
          },
          FE: {
            description: 'Iron, Fe',
            unit: 'mg',
            value: 0,
          },
          P: {
            description: 'Phosphorus, P',
            unit: 'mg',
            value: 0,
          },
          K: {
            description: 'Potassium, K',
            unit: 'mg',
            value: 0,
          },
          NA: {
            description: 'Sodium, Na',
            unit: 'mg',
            value: 0,
          },
          VITA_IU: {
            description: 'Vitamin A, IU',
            unit: 'IU',
            value: 0,
          },
          TOCPHA: {
            description: 'Vitamin E (alpha-tocopherol)',
            unit: 'mg',
            value: 0,
          },
          VITD: {
            description: 'Vitamin D',
            unit: 'IU',
            value: 0,
          },
          VITC: {
            description: 'Vitamin C, total ascorbic acid',
            unit: 'mg',
            value: 0,
          },
          VITB12: {
            description: 'Vitamin B-12',
            unit: 'µg',
            value: 0,
          },
          FOLAC: {
            description: 'Folic acid',
            unit: 'µg',
            value: 0,
          },
          CHOLE: {
            description: 'Cholesterol',
            unit: 'mg',
            value: 0,
          },
          FATRN: {
            description: 'Fatty acids, total trans',
            unit: 'g',
            value: 0,
          },
          FASAT: {
            description: 'Fatty acids, total saturated',
            unit: 'g',
            value: 0,
          },
          FAMS: {
            description: 'Fatty acids, total monounsaturated',
            unit: 'g',
            value: 0,
          },
          FAPU: {
            description: 'Fatty acids, total polyunsaturated',
            unit: 'g',
            value: 0,
          },
        };
        nutrientNames.forEach((nutrientName: string) => {
          const nutrValue = recipe.nutrition[nutrientName].value / 100 * subrec.quantity * recipe.gramsPerMeasure;
          totalRecipeNutr[nutrientName].value = nutrValue;
        });
        nutrArr.push(totalRecipeNutr);
      });
    }
    const totalNutr = nutrArr.reduce((acc, curr) => {
      const nutrientNames = Object.keys(acc);
      nutrientNames.forEach((nutrientName: string) => {
        acc[nutrientName].value = +(acc[nutrientName].value + curr[nutrientName].value).toFixed(3);
        });
      return acc;
    }, {
      PROCNT: {
        description: 'Protein',
        unit: 'g',
        value: 0,
      },
      FAT: {
        description: 'Total lipid (fat)',
        unit: 'g',
        value: 0,
      },
      CHOCDF: {
        description: 'Carbohydrate, by difference',
        unit: 'g',
        value: 0,
      },
      ENERC_KCAL: {
        description: 'Energy',
        unit: 'kcal',
        value: 0,
      },
      SUGAR: {
        description: 'Sugars, total',
        unit: 'g',
        value: 0,
      },
      FIBTG: {
        description: 'Fiber, total dietary',
        unit: 'g',
        value: 0,
      },
      CA: {
        description: 'Calcium, Ca',
        unit: 'mg',
        value: 0,
      },
      FE: {
        description: 'Iron, Fe',
        unit: 'mg',
        value: 0,
      },
      P: {
        description: 'Phosphorus, P',
        unit: 'mg',
        value: 0,
      },
      K: {
        description: 'Potassium, K',
        unit: 'mg',
        value: 0,
      },
      NA: {
        description: 'Sodium, Na',
        unit: 'mg',
        value: 0,
      },
      VITA_IU: {
        description: 'Vitamin A, IU',
        unit: 'IU',
        value: 0,
      },
      TOCPHA: {
        description: 'Vitamin E (alpha-tocopherol)',
        unit: 'mg',
        value: 0,
      },
      VITD: {
        description: 'Vitamin D',
        unit: 'IU',
        value: 0,
      },
      VITC: {
        description: 'Vitamin C, total ascorbic acid',
        unit: 'mg',
        value: 0,
      },
      VITB12: {
        description: 'Vitamin B-12',
        unit: 'µg',
        value: 0,
      },
      FOLAC: {
        description: 'Folic acid',
        unit: 'µg',
        value: 0,
      },
      CHOLE: {
        description: 'Cholesterol',
        unit: 'mg',
        value: 0,
      },
      FATRN: {
        description: 'Fatty acids, total trans',
        unit: 'g',
        value: 0,
      },
      FASAT: {
        description: 'Fatty acids, total saturated',
        unit: 'g',
        value: 0,
      },
      FAMS: {
        description: 'Fatty acids, total monounsaturated',
        unit: 'g',
        value: 0,
      },
      FAPU: {
        description: 'Fatty acids, total polyunsaturated',
        unit: 'g',
        value: 0,
      },
    });
    this.recipeHelperService.changedNutritionValue(totalNutr, `${weight.toFixed(1)} g`);
  }
}
