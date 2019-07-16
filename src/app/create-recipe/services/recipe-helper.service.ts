import { Product } from './../../common/models/product/product';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Recipe } from '../../common/models/recipe/recipe';
import { Ingredient } from '../../common/models/ingredient';
import { Subrecipe } from '../../common/models/subrecipe';

@Injectable()
export class RecipeHelperService {
  private productObs = new Subject();
  public productObs$ = this.productObs.asObservable();
  private recipeObs = new Subject();
  public recipeObs$ = this.recipeObs.asObservable();
  private nutritionObs = new BehaviorSubject(null);
  public nutritionObs$ = this.nutritionObs.asObservable();

  // private er: Recipe;
  private er = {
    id: '3d6bb59c-800a-4aea-9724-aa91168f7a70',
    title: 'TEST1',
    imageUrl: 'https://images.all-free-download.com/images/graphiclarge/healthy_meal_background_vegetables_eggs_bacon_icons_6836169.jpg',
    notes: '',
    measure: '20 g',
    amount: 20,
    created: new Date('2019-07-13T14:41:07.630Z'),
    category: 'Appetizers',
    nutrition: {
      PROCNT: {
        description: 'Protein',
        unit: 'g',
        value: 2,
      },
      FAT: {
        description: 'Total lipid (fat)',
        unit: 'g',
        value: 0.6,
      },
      CHOCDF: {
        description: 'Carbohydrate, by difference',
        unit: 'g',
        value: 9.26,
      },
      ENERC_KCAL: {
        description: 'Energy',
        unit: 'kcal',
        value: 50,
      },
      SUGAR: {
        description: 'Sugars, total',
        unit: 'g',
        value: 2.93,
      },
      FIBTG: {
        description: 'Fiber, total dietary',
        unit: 'g',
        value: 2,
      },
      CA: {
        description: 'Calcium, Ca',
        unit: 'mg',
        value: 32,
      },
      FE: {
        description: 'Iron, Fe',
        unit: 'mg',
        value: 0.4,
      },
      P: {
        description: 'Phosphorus, P',
        unit: 'mg',
        value: 35,
      },
      K: {
        description: 'Potassium, K',
        unit: 'mg',
        value: 352,
      },
      NA: {
        description: 'Sodium, Na',
        unit: 'mg',
        value: 5,
      },
      VITA_IU: {
        description: 'Vitamin A, IU',
        unit: 'IU',
        value: 2793,
      },
      TOCPHA: {
        description: 'Vitamin E (alpha-tocopherol)',
        unit: 'mg',
        value: 0.08,
      },
      VITD: {
        description: 'Vitamin D',
        unit: 'IU',
        value: 0,
      },
      VITC: {
        description: 'Vitamin C, total ascorbic acid',
        unit: 'mg',
        value: 4.9,
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
        value: 0.095,
      },
      FAMS: {
        description: 'Fatty acids, total monounsaturated',
        unit: 'g',
        value: 0.166,
      },
      FAPU: {
        description: 'Fatty acids, total polyunsaturated',
        unit: 'g',
        value: 0.28,
      },
    },
    ingredients: [
      {
        id: '1fa75551-4e66-4838-a702-7b6a491b8048',
        product: 'Babyfood, vegetable, butternut squash and corn',
        unit: '1 g',
        quantity: 20,
        measures: [
          {
            measure: '1 g',
            gramsPerMeasure: 1,
          },
          {
            measure: '1 jar, Gerber (4 oz)',
            gramsPerMeasure: 113,
          },
        ],
        nutrition: {
          PROCNT: {
            description: 'Protein',
            unit: 'g',
            value: 2,
          },
          FAT: {
            description: 'Total lipid (fat)',
            unit: 'g',
            value: 0.6,
          },
          CHOCDF: {
            description: 'Carbohydrate, by difference',
            unit: 'g',
            value: 9.26,
          },
          ENERC_KCAL: {
            description: 'Energy',
            unit: 'kcal',
            value: 50,
          },
          SUGAR: {
            description: 'Sugars, total',
            unit: 'g',
            value: 2.93,
          },
          FIBTG: {
            description: 'Fiber, total dietary',
            unit: 'g',
            value: 2,
          },
          CA: {
            description: 'Calcium, Ca',
            unit: 'mg',
            value: 32,
          },
          FE: {
            description: 'Iron, Fe',
            unit: 'mg',
            value: 0.4,
          },
          P: {
            description: 'Phosphorus, P',
            unit: 'mg',
            value: 35,
          },
          K: {
            description: 'Potassium, K',
            unit: 'mg',
            value: 352,
          },
          NA: {
            description: 'Sodium, Na',
            unit: 'mg',
            value: 5,
          },
          VITA_IU: {
            description: 'Vitamin A, IU',
            unit: 'IU',
            value: 2793,
          },
          TOCPHA: {
            description: 'Vitamin E (alpha-tocopherol)',
            unit: 'mg',
            value: 0.08,
          },
          VITD: {
            description: 'Vitamin D',
            unit: 'IU',
            value: 0,
          },
          VITC: {
            description: 'Vitamin C, total ascorbic acid',
            unit: 'mg',
            value: 4.9,
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
            value: 0.095,
          },
          FAMS: {
            description: 'Fatty acids, total monounsaturated',
            unit: 'g',
            value: 0.166,
          },
          FAPU: {
            description: 'Fatty acids, total polyunsaturated',
            unit: 'g',
            value: 0.28,
          },
        },
      },
    ],
    subrecipes: [],
  };
  private editedRecipe: Recipe;
  private productsArr: Array<Product & Ingredient> = [];
  private recipesArr: Array<Recipe & Subrecipe> = [];

  constructor() {
    this.editRecipe(this.er);
    const nutr = this.recipeToEdit.nutrition;
    const measure = this.recipeToEdit.measure;
    this.nutritionObs.next({nutr, measure});
  }

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

  clearRecipeItems(): void {
    this.productsArr = [];
    this.recipesArr = [];
  }

  editRecipe(recipe: Recipe) {
    this.editedRecipe = { ...recipe };
    this.productsArr = [...(recipe.ingredients as any)];
    this.recipesArr = [...(recipe.subrecipes as any)];
  }
}
