import { Nutrition } from 'src/app/common/models/nutrition';
import { RecipeDetailedViewComponent } from './recipe-detailed-view.component';
import { async, ComponentFixture, TestBed, } from '@angular/core/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { NotificatorService } from '../core/services/notificator.service';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NutritionTableComponent } from '../components/nutrition-table/nutrition-table.component';
import { of } from 'rxjs';
import { Ingredient } from '../common/models/ingredient';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Recipe } from '../common/models/recipe/recipe';
import { RecipeDetailedViewRoutingModule } from './recipe-detailed-view-routing.module';

describe('RecipeDetailedViewComponent', () => {
  let fixture: ComponentFixture<RecipeDetailedViewComponent>;
  let component: RecipeDetailedViewComponent;
  const notificator = jasmine.createSpyObj('NotificatorService', ['success']);

  const helperService = jasmine.createSpyObj('RecipeHelperService', [
    'editRecipe',
    'calculateTotalRecipeNutrition',
    'calculateSubreciepTotalNutrition',
    'calculateIngredientTotalNutrition'
  ]);

  const recipeService = jasmine.createSpyObj('RecipesService', ['deleteRecipe']);

  const nutrition: Nutrition = {
    PROCNT: {
      description: 'Protein',
      unit: 'g',
      value: 100,
    },
    FAT: {
      description: 'Total lipid (fat)',
      unit: 'g',
      value: 100,
    },
    CHOCDF: {
      description: 'Carbohydrate, by difference',
      unit: 'g',
      value: 100,
    },
    ENERC_KCAL: {
      description: 'Energy',
      unit: 'kcal',
      value: 100,
    },
    SUGAR: {
      description: 'Sugars, total',
      unit: 'g',
      value: 100,
    },
    FIBTG: {
      description: 'Fiber, total dietary',
      unit: 'g',
      value: 100,
    },
    CA: {
      description: 'Calcium, Ca',
      unit: 'mg',
      value: 100,
    },
    FE: {
      description: 'Iron, Fe',
      unit: 'mg',
      value: 100,
    },
    P: {
      description: 'Phosphorus, P',
      unit: 'mg',
      value: 100,
    },
    K: {
      description: 'Potassium, K',
      unit: 'mg',
      value: 100,
    },
    NA: {
      description: 'Sodium, Na',
      unit: 'mg',
      value: 100,
    },
    VITA_IU: {
      description: 'Vitamin A, IU',
      unit: 'IU',
      value: 100,
    },
    TOCPHA: {
      description: 'Vitamin E (alpha-tocopherol)',
      unit: 'mg',
      value: 100,
    },
    VITD: {
      description: 'Vitamin D',
      unit: 'IU',
      value: 100,
    },
    VITC: {
      description: 'Vitamin C, total ascorbic acid',
      unit: 'mg',
      value: 100,
    },
    VITB12: {
      description: 'Vitamin B-12',
      unit: 'µg',
      value: 100,
    },
    FOLAC: {
      description: 'Folic acid',
      unit: 'µg',
      value: 100,
    },
    CHOLE: {
      description: 'Cholesterol',
      unit: 'mg',
      value: 100,
    },
    FATRN: {
      description: 'Fatty acids, total trans',
      unit: 'g',
      value: 100,
    },
    FASAT: {
      description: 'Fatty acids, total saturated',
      unit: 'g',
      value: 100,
    },
    FAMS: {
      description: 'Fatty acids, total monounsaturated',
      unit: 'g',
      value: 100,
    },
    FAPU: {
      description: 'Fatty acids, total polyunsaturated',
      unit: 'g',
      value: 100,
    },
  };

  const ingredient: Ingredient = {
    id: 'ingredientID',
    product: 'whiskey',
    measures: [
      {
        measure: '1 g',
        gramsPerMeasure: 1,
      }
    ],
    unit: '1 g',
    gramsPerMeasure: 1,
    quantity: 100,
    nutrition
  };

  const recipe: Recipe = {
    id: 'recipeID',
    title: 'Whiskey',
    category: 'Drinks',
    imageUrl: 'https://images.vat19.com/wobbling-whiskey-glasses/wobbling-whiskey-glasses-table.jpg',
    notes: 'This is my favourite recipe',
    measure: '100 g',
    gramsPerMeasure: 100,
    created: new Date(),
    ingredients: [ingredient],
    subrecipes: [],
    nutrition
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        RecipeDetailedViewRoutingModule
      ],
      declarations: [RecipeDetailedViewComponent, NutritionTableComponent],
      providers: [
        {
          provide: NotificatorService,
          useValue: notificator
        },
        {
          provide: RecipeHelperService,
          useValue: helperService
        },
        {
          provide: RecipesService,
          useVAlue: recipeService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: of({id: '1'})
            }
        }
      }
      ]
    });
  }));


  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should be defined', () => {
      fixture = TestBed.createComponent(RecipeDetailedViewComponent);
      component = fixture.debugElement.componentInstance;
      expect(component).toBeDefined();
    });

  // it('updateRecipe should edit recipe', (async () => {
  //     fixture = TestBed.createComponent(RecipeDetailedViewComponent);
  //     component = fixture.debugElement.componentInstance;
  //     helperService.calculateTotalRecipeNutrition.and.returnValue(nutrition);
  //     await fixture.detectChanges(); // ngOnInit()
  //     console.log(component.recipe);
  //     helperService.editRecipe.calls.reset();
  //     component.updateRecipe();

  //     await fixture.detectChanges();
  //     expect(helperService.editRecipe).toHaveBeenCalledTimes(1);
  //   }));


  // describe('ngOnInit', () => {
  //   it('should set recipe', (() => {
  //     fixture = TestBed.createComponent(RecipeDetailedViewComponent);
  //     component = fixture.componentInstance;

  //     const route = {
  //         data: {
  //           subscribe: (
  //             recipe
  //           ),
  //         }
  //       };

      // component.totalRecipeNutrition = {
      //   PROCNT: {
      //     description: 'Protein',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   FAT: {
      //     description: 'Total lipid (fat)',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   CHOCDF: {
      //     description: 'Carbohydrate, by difference',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   ENERC_KCAL: {
      //     description: 'Energy',
      //     unit: 'kcal',
      //     value: 0,
      //   },
      //   SUGAR: {
      //     description: 'Sugars, total',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   FIBTG: {
      //     description: 'Fiber, total dietary',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   CA: {
      //     description: 'Calcium, Ca',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   FE: {
      //     description: 'Iron, Fe',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   P: {
      //     description: 'Phosphorus, P',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   K: {
      //     description: 'Potassium, K',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   NA: {
      //     description: 'Sodium, Na',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   VITA_IU: {
      //     description: 'Vitamin A, IU',
      //     unit: 'IU',
      //     value: 0,
      //   },
      //   TOCPHA: {
      //     description: 'Vitamin E (alpha-tocopherol)',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   VITD: {
      //     description: 'Vitamin D',
      //     unit: 'IU',
      //     value: 0,
      //   },
      //   VITC: {
      //     description: 'Vitamin C, total ascorbic acid',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   VITB12: {
      //     description: 'Vitamin B-12',
      //     unit: 'µg',
      //     value: 0,
      //   },
      //   FOLAC: {
      //     description: 'Folic acid',
      //     unit: 'µg',
      //     value: 0,
      //   },
      //   CHOLE: {
      //     description: 'Cholesterol',
      //     unit: 'mg',
      //     value: 0,
      //   },
      //   FATRN: {
      //     description: 'Fatty acids, total trans',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   FASAT: {
      //     description: 'Fatty acids, total saturated',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   FAMS: {
      //     description: 'Fatty acids, total monounsaturated',
      //     unit: 'g',
      //     value: 0,
      //   },
      //   FAPU: {
      //     description: 'Fatty acids, total polyunsaturated',
      //     unit: 'g',
      //     value: 0,
      //   },
      // };
  //     expect(component.recipe).toEqual(recipe);
  //    }));
  // });


});
