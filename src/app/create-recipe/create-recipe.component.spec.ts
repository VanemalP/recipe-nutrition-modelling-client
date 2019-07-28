import { Location } from '@angular/common';
import { ProductsService } from './services/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { of, Subscription, Observable, empty } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { NotificatorService } from '../core/services/notificator.service';
import { CreateRecipeComponent } from './create-recipe.component';
import { CreateRecipeRoutingModule } from './create-recipe.routing.module';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { ItemsSearchDetailsComponent } from './items-search/items-search-details/items-search-details.component';
import { CreateSearchResultComponent } from './items-search/create-search-result/create-search-result.component';
import { CreateRecipeDetailsComponent } from './create-recipe-details/create-recipe-details.component';
import { ImgDialogComponent } from './create-recipe-details/img-dialog/img-dialog.component';
import { NutrDialogComponent } from './create-recipe-details/nutr-dialog/nutr-dialog.component';
import { RecipesService } from '../core/services/recipes.service';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Recipe } from '../common/models/recipe/recipe';
import { Ingredient } from '../common/models/ingredient';
import { Nutrition } from '../common/models/nutrition';
import { Measure } from '../common/models/measure';

describe('CreateRecipeComponent', () => {
  let fixture;
  let component: CreateRecipeComponent;
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
    id: 'ingredient2ID',
    product: 'ingredient2',
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

  const recipeToEdit: Recipe = {
    id: 'recipeId',
    title: 'recipe',
    category: 'Salads',
    imageUrl: '',
    notes: '',
    measure: '100 g',
    gramsPerMeasure: 100,
    created: new Date(),
    ingredients: [ingredient],
    subrecipes: [],
    nutrition
  };
  const notificator = jasmine.createSpyObj('NotificatorService', ['success', 'error']);
  const activatedRoute = {
    data: {
      subscribe: (fn: (value: Data) => void) => fn({
        categories: ['Soups'],
        foodGroups: ['Fruits']
      }),
    }
  };
  const productsService = jasmine.createSpyObj('ProductsService', ['getProducts']);
  const recipesService = jasmine.createSpyObj('RecipesService', ['getRecipes', 'createRecipe', 'updateRecipe']);
  let recipeHelperService = jasmine.createSpyObj('RecipeHelperService', [
      'clearRecipeItems',
      'addProductToRecipe',
      'addRecipeToRecipe',
      'removeIngredientFromRecipe',
      'removeSubrecipeFromRecipe',
      'calculateTotalNutrition',
      'createEmptyNutrition',
      'changedNutritionValue'
  ]);
  recipeHelperService.nutritionObs$ = of({nutr: emptyNutrition, measure: '0 g'});
  recipeHelperService.productObs$ = of({});
  // recipeHelperService.recipeIngredients = [];
  recipeHelperService.recipeObs$ = of({});
  // recipeHelperService.recipeSubrecipes = [];
  const router = jasmine.createSpyObj('Router', ['navigate']);
  const location = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateRecipeComponent,
        ItemsSearchComponent,
        ItemsSearchDetailsComponent,
        CreateSearchResultComponent,
        CreateRecipeDetailsComponent,
        ImgDialogComponent,
        NutrDialogComponent,
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        CreateRecipeRoutingModule
      ],
      providers: [
        {
          provide: NotificatorService,
          useValue: notificator,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: ProductsService,
          useValue: productsService,
        },
        {
          provide: RecipesService,
          useValue: recipesService,
        },
        {
          provide: RecipeHelperService,
          useValue: recipeHelperService,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: Location,
          useValue: location,
        },
      ]
    });
  }));

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should create CreateRecipeComponent', () => {
    fixture = TestBed.createComponent(CreateRecipeComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should initialize with correct data', async () => {
      recipeHelperService.recipeToEdit = null;
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      await fixture.detectChanges();

      expect(component.recipeToEdit).toEqual(null);
      expect(component.recipeCategories.length).toBe(1);
      expect(component.productFoodGroups.length).toBe(1);
      expect(component.nutrition).toEqual(emptyNutrition);
      expect(component.measure).toBe('0 g');
    });

    it('should initialize with correct data when recipeToEdit', async () => {
      recipeHelperService.recipeToEdit = recipeToEdit;
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      await fixture.detectChanges();

      expect(component.recipeToEdit).toEqual(recipeToEdit);
      expect(component.oldProducts.length).toBe(1);
      expect(component.oldRecipes.length).toBe(0);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should call recipeHelperService.clearRecipeItems', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      component.nutritionSubscription = new Subscription();
      recipeHelperService.clearRecipeItems.calls.reset();
      recipeHelperService.clearRecipeItems.and.returnValue('cleared');
      component.ngOnDestroy();
      await fixture.detectChanges();

      expect(recipeHelperService.clearRecipeItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('findItems()', () => {
    it('should call productsService.getProducts with correct query when when search.items is "products"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const search = {items: 'products', inputValue: '', selectedValue: ''};
      productsService.getProducts.calls.reset();
      productsService.getProducts.and.returnValue(of({}));
      component.findItems(search);
      await fixture.detectChanges();

      expect(productsService.getProducts).toHaveBeenCalledTimes(1);
      expect(productsService.getProducts).toHaveBeenCalledWith({description: '', foodGroup: ''});
      expect(component.loading).toBe(false);
    });

    it('should set loading to true when products are still receiving', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const search = {items: 'products', inputValue: '', selectedValue: ''};
      productsService.getProducts.and.returnValue(of());

      component.findItems(search);
      await fixture.detectChanges();

      expect(component.loading).toBe(true);
    });

    it('should call recipesService.getRecipes with correct query when search.items is "recipes"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const search = {items: 'recipes', inputValue: '', selectedValue: ''};
      recipesService.getRecipes.calls.reset();
      recipesService.getRecipes.and.returnValue(of({}));
      component.findItems(search);
      await fixture.detectChanges();

      expect(recipesService.getRecipes).toHaveBeenCalledTimes(1);
      expect(recipesService.getRecipes).toHaveBeenCalledWith({title: '', category: ''});
      expect(component.loading).toBe(false);
    });

    it('should set loading to true when recipes is still receiving', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const search = {items: 'recipes', inputValue: '', selectedValue: ''};
      recipesService.getRecipes.and.returnValue(of());

      component.findItems(search);
      await fixture.detectChanges();

      expect(component.loading).toBe(true);
    });
  });

  describe('clearSearchResults()', () => {
    it('should set foundProducts to null when item is "products"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = 'products';
      component.clearSearchResults(item);
      await fixture.detectChanges();

      expect(component.foundProducts).toBe(null);
    });

    it('should set foundRecipes to null when item is "recipes"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = 'recipes';
      component.clearSearchResults(item);
      await fixture.detectChanges();

      expect(component.foundRecipes).toBe(null);
    });
  });

  describe('addToRecipe()', () => {
    it('should add item addedProducts when item.itemType is "products"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'products', item: {}};
      await fixture.detectChanges();
      const length = component.addedProducts.length;
      component.addToRecipe(item);
      await fixture.detectChanges();

      expect(component.addedProducts.length).toBe(length + 1);
    });

    it('should call recipeHelperService.addProductToRecipe with correct data when item.itemType is "products"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'products', item: {}};
      recipeHelperService.addProductToRecipe.calls.reset();
      recipeHelperService.addProductToRecipe.and.returnValue('added product');
      await fixture.detectChanges();
      component.addToRecipe(item);
      await fixture.detectChanges();

      expect(recipeHelperService.addProductToRecipe).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.addProductToRecipe).toHaveBeenCalledWith({});
    });

    it('should call window.scrollTo with correct data when item.itemType is "products"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'products', item: {}};
      spyOn(window, 'scrollTo').and.callThrough();
      await fixture.detectChanges();
      component.addToRecipe(item);
      await fixture.detectChanges();
      const containerHeight = component.container.nativeElement.scrollHeight;

      expect(window.scrollTo).toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalledWith(0, containerHeight);
    });

    it('should add item addedRecipes when item.itemType is "recipes"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'recipes', item: {}};
      await fixture.detectChanges();
      const length = component.addedRecipes.length;
      component.addToRecipe(item);
      await fixture.detectChanges();

      expect(component.addedRecipes.length).toBe(length + 1);
    });

    it('should call recipeHelperService.addProductToRecipe with correct data when item.itemType is "recipes"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'recipes', item: {}};
      recipeHelperService.addRecipeToRecipe.calls.reset();
      recipeHelperService.addRecipeToRecipe.and.returnValue('added recipe');
      await fixture.detectChanges();
      component.addToRecipe(item);
      await fixture.detectChanges();

      expect(recipeHelperService.addRecipeToRecipe).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.addRecipeToRecipe).toHaveBeenCalledWith({});
    });

    it('should call window.scrollTo with correct data when item.itemType is "recipes"', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const item = {itemType: 'recipes', item: {}};
      spyOn(window, 'scrollTo').and.callThrough();
      await fixture.detectChanges();
      component.addToRecipe(item);
      await fixture.detectChanges();
      const containerHeight = component.container.nativeElement.scrollHeight;

      expect(window.scrollTo).toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalledWith(0, containerHeight);
    });
  });

  describe('deleteItem()', () => {
    it('should call recipeHelperService.removeIngredientFromRecipe when data.item is "product"', async () => {
      recipeHelperService.recipeIngredients = [];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const data = {item: 'product', index: 0};
      recipeHelperService.removeIngredientFromRecipe.calls.reset();
      recipeHelperService.removeIngredientFromRecipe.and.returnValue('ingredient removed');
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(recipeHelperService.removeIngredientFromRecipe).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.removeIngredientFromRecipe).toHaveBeenCalledWith(0);
    });

    it('should call recipeHelperService.removeSubrecipeFromRecipe when data.item is "recipe"', async () => {
      recipeHelperService.recipeSubrecipes = [];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const data = {item: 'recipe', index: 0};
      recipeHelperService.removeSubrecipeFromRecipe.calls.reset();
      recipeHelperService.removeSubrecipeFromRecipe.and.returnValue('subrecipe removed');
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(recipeHelperService.removeSubrecipeFromRecipe).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.removeSubrecipeFromRecipe).toHaveBeenCalledWith(0);
    });

    it('should remove item from addedProducts when data.item is "product" and item is in the array', async () => {
      const productToDelete = {
        code: 1,
        description: '',
        foodGroup: '',
        nutrition: {} as Nutrition,
        measures: [{} as Measure]
      };
      recipeHelperService.recipeIngredients = [productToDelete];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      component.addedProducts = [productToDelete];
      recipeHelperService.removeIngredientFromRecipe.calls.reset();
      recipeHelperService.removeIngredientFromRecipe.and.returnValue('ingredient removed');
      length = component.addedProducts.length;
      const data = {item: 'product', index: 0};
      await fixture.detectChanges();
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(component.addedProducts.length).toBe(length - 1);
    });

    it('should remove item from oldProducts when data.item is "product" and item is in the array', async () => {
      const ingrToDelete = {
        id: 'id',
        product: 'desc',
        unit: '',
        gramsPerMeasure: 1,
        quantity: 1,
        nutrition: {} as Nutrition,
        measures: [{} as Measure],
        isDeleted: false
      };
      recipeHelperService.recipeIngredients = [ingrToDelete];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      component.oldProducts = [ingrToDelete];
      recipeHelperService.removeIngredientFromRecipe.calls.reset();
      recipeHelperService.removeIngredientFromRecipe.and.returnValue('ingredient removed');
      length = component.oldProducts.length;
      const data = {item: 'product', index: 0};
      console.log('delete oldProducts', component.oldProducts);
      console.log('delete recipeHelperService.recipeIngredients', recipeHelperService.recipeIngredients[0]);
      await fixture.detectChanges();
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(component.oldProducts[0].isDeleted).toBe(true);
    });

    it('should remove item from addedRecipes when data.item is "recipe" and item is in the array', async () => {
      const recipeToDelete = {
        id: 'id',
        title: 'title',
        category: '',
        imageUrl: '',
        notes: '',
        nutrition: {} as Nutrition,
        measure: '',
        gramsPerMeasure: 1,
        created: new Date()
      };
      recipeHelperService.recipeSubrecipes = [recipeToDelete];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      component.addedRecipes = [recipeToDelete];
      recipeHelperService.removeSubrecipeFromRecipe.calls.reset();
      recipeHelperService.removeSubrecipeFromRecipe.and.returnValue('subrecipe removed');
      length = component.addedRecipes.length;
      const data = {item: 'recipe', index: 0};
      await fixture.detectChanges();
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(component.addedRecipes.length).toBe(length - 1);
    });

    it('should remove item from oldRecipes when data.item is "recipe" and item is in the array', async () => {
      const subrecipeToDelete = {
        id: 'id',
        recipe: 'title',
        unit: '',
        quantity: 1,
        gramsPerMeasure: 1,
        nutrition: {} as Nutrition,
        isDeleted: false
      };
      recipeHelperService.recipeSubrecipes = [subrecipeToDelete];
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      component.oldRecipes = [subrecipeToDelete];
      recipeHelperService.removeSubrecipeFromRecipe.calls.reset();
      recipeHelperService.removeSubrecipeFromRecipe.and.returnValue('subrecipe removed');
      length = component.oldRecipes.length;
      const data = {item: 'recipe', index: 0};
      console.log('delete oldRecipes', component.oldRecipes);
      console.log('delete recipeHelperService.recipeSubrecipes', recipeHelperService.recipeSubrecipes[0]);
      await fixture.detectChanges();
      component.deleteItem(data);
      await fixture.detectChanges();

      expect(component.oldRecipes[0].isDeleted).toBe(true);
    });
  });

  describe('createRecipe()', () => {
    it('should call recipesService.createRecipe with correct data', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const data = {
        title: 'title',
        imageUrl: 'imageUrl',
        category: 'category',
        notes: 'notes',
        ingredients: [{
          recipeItem: 1,
          quantity: 1,
          unit: '1 g'
        }],
        subrecipes: [{
          recipeItem: 'id',
          quantity: '1',
          unit: '1 g'
        }]
      };
      recipesService.createRecipe.calls.reset();
      recipesService.createRecipe.and.returnValue(of('created'));
      component.createRecipe(data);
      await fixture.detectChanges();

      expect(recipesService.createRecipe).toHaveBeenCalledTimes(1);
      expect(recipesService.createRecipe).toHaveBeenCalledWith({
        title: 'title',
        imageUrl: 'imageUrl',
        category: 'category',
        notes: 'notes',
        newIngredientsData: [{
          productCode: 1,
          quantity: 1,
          unit: '1 g'
        }],
        newSubrecipesData: [{
          recipeId: 'id',
          quantity: 1,
          unit: '1 g'
        }]
      });
    });
  });

  describe('updateRecipe()', () => {
    it('should call recipesService.updateRecipe with correct data', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const product = {
        code: 1,
        description: 'product',
        foodGroup: '',
        nutrition,
        measures: [{} as Measure]
      };
      const oldProduct = {
        id: 'oldProduct',
        product: 'oldProduct',
        nutrition,
        measures: [{} as Measure],
        gramsPerMeasure: 1,
        quantity: 1,
        unit: '1 g'
      };
      const recipe = {
        id: 'recipe',
        title: 'recipe',
        category: '',
        imageUrl: '',
        notes: '',
        nutrition,
        measure: '',
        gramsPerMeasure: 1,
        created: new Date()
      };
      const oldRecipe = {
        id: 'oldRecipe',
        recipe: 'oldRecipe',
        unit: '1 g',
        quantity: 1,
        nutrition,
        gramsPerMeasure: 1
      };
      const recipeData = {
        title: 'title',
        imageUrl: 'imageUrl',
        category: 'category',
        notes: 'notes',
        ingredients: [
          {
            recipeItem: 1,
            unit: '1 g',
            quantity: 100,
            unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
          },
          {
            recipeItem: 'oldProduct',
            unit: '1 g',
            quantity: 100,
            unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
          },
        ],
        subrecipes: [
          {
            recipeItem: 'recipe',
            unit: '1 g',
            quantity: 100,
            unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
          },
          {
            recipeItem: 'oldRecipe',
            unit: '1 g',
            quantity: 100,
            unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
          },
        ]
      };
      recipeHelperService.recipeToEdit = recipeToEdit;
      component.addedProducts = [product];
      component.oldProducts = [oldProduct];
      component.addedRecipes = [recipe];
      component.oldRecipes = [oldRecipe];
      recipesService.updateRecipe.calls.reset();
      recipesService.updateRecipe.and.returnValue(of('updated'));
      component.recipeToEdit = recipeToEdit;
      console.log('update recipeToEdit', component.recipeToEdit);
      await fixture.detectChanges();
      component.updateRecipe(recipeData);
      await fixture.detectChanges();

      expect(recipesService.updateRecipe).toHaveBeenCalledTimes(1);
    });
  });

  describe('changedValue()', () => {
    it('should call recipeHelperService.calculateTotalNutrition with correct data when recipeData.ingredients.lenght>0', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const recipeData = {
        ingredients: [{
          recipeItem: 1,
          unit: '1 g',
          quantity: 100,
          unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
        }],
        subrecipes: []
      };
      const product = {
        code: 1,
        description: '',
        foodGroup: '',
        nutrition,
        measures: [{} as Measure]
      };
      component.addedProducts = [product];
      recipeHelperService.createEmptyNutrition.and.returnValue(emptyNutrition);
      recipeHelperService.calculateTotalNutrition.calls.reset();
      recipeHelperService.calculateTotalNutrition.and.returnValue(nutrition);
      await fixture.detectChanges();
      component.changedValue(recipeData);
      await fixture.detectChanges();

      expect(recipeHelperService.calculateTotalNutrition).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.calculateTotalNutrition).toHaveBeenCalledWith(nutrition, 100, 1);
    });

    it('should call recipeHelperService.calculateTotalNutrition with correct data when recipeData.subrecipes.lenght>0', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      const recipeData = {
        ingredients: [],
        subrecipes: [{
          recipeItem: 'id',
          unit: '1 g',
          quantity: 100,
          unitOptions: [{measure: '1 g', gramsPerMeasure: '1'}]
        }]
      };
      const ingr = {
        id: 'id',
        title: 'title',
        category: '',
        imageUrl: '',
        notes: '',
        nutrition,
        measure: '',
        gramsPerMeasure: 1,
        created: new Date()
      };
      component.addedRecipes = [ingr];
      recipeHelperService.createEmptyNutrition.and.returnValue(emptyNutrition);
      recipeHelperService.calculateTotalNutrition.calls.reset();
      recipeHelperService.calculateTotalNutrition.and.returnValue(nutrition);
      await fixture.detectChanges();
      component.changedValue(recipeData);
      await fixture.detectChanges();

      expect(recipeHelperService.calculateTotalNutrition).toHaveBeenCalledTimes(1);
      expect(recipeHelperService.calculateTotalNutrition).toHaveBeenCalledWith(nutrition, 100, 1);
    });
  });

  describe('cancelAction()', () => {
    it('should call location.back', async () => {
      fixture = TestBed.createComponent(CreateRecipeComponent);
      component = fixture.componentInstance;
      location.back.calls.reset();
      location.back.and.returnValue('go back');
      component.cancelAction();
      await fixture.detectChanges();

      expect(location.back).toHaveBeenCalledTimes(1);
    });
  });
});
