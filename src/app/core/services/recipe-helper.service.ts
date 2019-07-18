import { Product } from '../../common/models/product/product';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Recipe } from '../../common/models/recipe/recipe';
import { Ingredient } from '../../common/models/ingredient';
import { Subrecipe } from '../../common/models/subrecipe';
import { Nutrition } from '../../common/models/nutrition';

@Injectable()
export class RecipeHelperService {
  private productObs = new Subject();
  public productObs$ = this.productObs.asObservable();
  private recipeObs = new Subject();
  public recipeObs$ = this.recipeObs.asObservable();

  private ingrNutrition: Nutrition;
  private emptyNutrition: Nutrition = {
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
  private nutritionObs = new BehaviorSubject({nutr: this.emptyNutrition, measure: '0.0 g'});
  public nutritionObs$ = this.nutritionObs.asObservable();

  private editedRecipe: Recipe;
  private productsArr: Array<Product & Ingredient> = [];
  private recipesArr: Array<Recipe & Subrecipe> = [];

  constructor() { }

  addProductToRecipe(item: Product & Ingredient) {
    this.productsArr.push(item);
    this.productObs.next(item);
  }

  addRecipeToRecipe(item: Recipe & Subrecipe) {
    this.recipesArr.push(item);
    this.recipeObs.next(item);
  }

  removeProductFromRecipe(index: number): void {
    this.productsArr.splice(index, 1);
  }

  removeRecipeFromRecipe(index: number): void {
    this.recipesArr.splice(index, 1);
  }

  get recipeProducts(): Array<Product & Ingredient> {
    return this.productsArr;
  }

  get recipeRecipes(): Array<Recipe & Subrecipe> {
    return this.recipesArr;
  }

  get recipeToEdit(): Recipe {
    return this.editedRecipe;
  }

  set recipeToEdit(rec: Recipe) {
    this.editedRecipe = rec;
  }

  set ingredientNutrition(nutr) {
    this.ingrNutrition = nutr;
  }

  clearRecipeItems(): void {
    this.recipeToEdit = null;
    this.productsArr = [];
    this.recipesArr = [];
    this.nutritionObs.next({nutr: this.emptyNutrition, measure: '0.0 g'});
  }

  editRecipe(recipe: Recipe) {
    this.recipeToEdit = { ...recipe };
    this.productsArr = [...(recipe.ingredients as any)];
    this.recipesArr = [...(recipe.subrecipes as any)];
    const nutrientNames = Object.keys(this.recipeToEdit.nutrition);
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
      const nutrValue = this.recipeToEdit.nutrition[nutrientName].value / 100 * this.recipeToEdit.gramsPerMeasure;
      totalRecipeNutr[nutrientName].value = +nutrValue.toFixed(3);
    });

    const nutr = totalRecipeNutr;

    const measure = this.recipeToEdit.measure;
    this.nutritionObs.next({nutr, measure});
  }

  changedNutritionValue(nutr, measure) {
    this.nutritionObs.next({nutr, measure});
  }
}
