import { Product } from '../../common/models/product/product';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Recipe } from '../../common/models/recipe/recipe';
import { Ingredient } from '../../common/models/ingredient';
import { Subrecipe } from '../../common/models/subrecipe';
import { Nutrition } from '../../common/models/nutrition';

@Injectable()
export class RecipeHelperService {
  private product$ = new Subject();
  public productObs$ = this.product$.asObservable();
  private recipe$ = new Subject();
  public recipeObs$ = this.recipe$.asObservable();
  private allRecipes$ = new Subject();
  public allRecipesObs$ = this.allRecipes$.asObservable();

  private ingrNutrition: Nutrition;

  private nutrition$ = new BehaviorSubject({nutr: this.createEmptyNutrition(), measure: '0.0 g'});
  public nutritionObs$ = this.nutrition$.asObservable();

  private editedRecipe: Recipe;
  private ingredientsArr: Array<Product & Ingredient> = [];
  private subrecipesArr: Array<Recipe & Subrecipe> = [];

  constructor() { }

  addProductToRecipe(item: Product & Ingredient) {
    this.ingredientsArr.push(item);
    this.product$.next(item);
  }

  addRecipeToRecipe(item: Recipe & Subrecipe) {
    this.subrecipesArr.push(item);
    this.recipe$.next(item);
  }

  removeIngredientFromRecipe(index: number): void {
    this.ingredientsArr.splice(index, 1);
  }

  removeSubrecipeFromRecipe(index: number): void {
    this.subrecipesArr.splice(index, 1);
  }

  get recipeIngredients(): Array<Product & Ingredient> {
    return this.ingredientsArr;
  }

  get recipeSubrecipes(): Array<Recipe & Subrecipe> {
    return this.subrecipesArr;
  }

  get recipeToEdit(): Recipe {
    return this.editedRecipe;
  }

  set recipeToEdit(rec: Recipe) {
    this.editedRecipe = rec;
  }

  set ingredientNutrition(nutr: Nutrition) {
    this.ingrNutrition = nutr;
  }

  clearRecipeItems(): void {
    this.recipeToEdit = null;
    this.ingredientsArr = [];
    this.subrecipesArr = [];
    this.nutrition$.next({nutr: this.createEmptyNutrition(), measure: '0.0 g'});
  }

  editRecipe(recipe: Recipe): void {
    this.recipeToEdit = { ...recipe };
    this.ingredientsArr = [...(recipe.ingredients as any)];
    this.subrecipesArr = [...(recipe.subrecipes as any)];
    const nutr: Nutrition = this.calculateTotalRecipeNutrition(this.recipeToEdit);
    const measure: string = this.recipeToEdit.measure;
    this.nutrition$.next({nutr, measure});
  }

  calculateTotalRecipeNutrition(recipe: Recipe) {
    return this.calculateTotalNutrition(recipe.nutrition, 1, recipe.gramsPerMeasure);
  }

  calculateSubreciepTotalNutrition(subrecipe: Subrecipe): Nutrition {
    return this.calculateTotalNutrition(subrecipe.nutrition, subrecipe.quantity, subrecipe.gramsPerMeasure);
  }

  calculateIngredientTotalNutrition(ingredient: Ingredient): Nutrition {
    const gramsPerMeasure: number = ingredient.measures.find((m) => m.measure === ingredient.unit).gramsPerMeasure;
    return this.calculateTotalNutrition(ingredient.nutrition, ingredient.quantity, gramsPerMeasure);
  }

  changedNutritionValue(nutr: Nutrition, measure: string): void {
    this.nutrition$.next({nutr, measure});
  }

  calcPercentage(nutrient: number, total: number, coef: number): number {
    const percent: number = Math.round(nutrient * coef * 100 / total);

    return percent;
  }

  allRecipesClicked(): void {
    this.allRecipes$.next('clicked');
  }

  createEmptyNutrition(): Nutrition {
    const emptyNutrition: Nutrition = {
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
    const emptyNutr: Nutrition = {...emptyNutrition};
    Object.keys(emptyNutr).forEach((nutrName) => emptyNutr[nutrName] = {...emptyNutrition[nutrName]});

    return emptyNutr;
  }

  calculateTotalNutrition(nutrPer100g: Nutrition, qty: number, gramsPerMeasure: number): Nutrition {
    const nutrientNames: string[] = Object.keys(nutrPer100g);
    const totalNutr: Nutrition = this.createEmptyNutrition();
    nutrientNames.forEach((nutrientName: string) => {
      const nutrValue: number = nutrPer100g[nutrientName].value / 100 * qty * gramsPerMeasure;
      totalNutr[nutrientName].value = +nutrValue.toFixed(3);
    });

    return totalNutr;
  }
}
