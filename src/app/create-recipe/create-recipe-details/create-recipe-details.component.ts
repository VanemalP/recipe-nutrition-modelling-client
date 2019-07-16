import { Subrecipe } from './../../common/models/subrecipe';
import { Ingredient } from './../../common/models/ingredient';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../../common/models/recipe/recipe';
import { Subscription } from 'rxjs';
import { isArray } from 'util';
import { RecipeHelperService } from '../services/recipe-helper.service';
import { Product } from '../../common/models/product/product';
import { Nutrition } from '../../common/models/nutrition';

@Component({
  selector: 'app-create-recipe-details',
  templateUrl: './create-recipe-details.component.html',
  styleUrls: ['./create-recipe-details.component.css']
})
export class CreateRecipeDetailsComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;

  @Input()
  recipeToEdit: Recipe;

  @Input()
  recipeCategories: string[];

  @Input()
  nutrition: Nutrition;

  @Input()
  measure: string;

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  update: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  selected = '1 g';

  private addProductSubscription: Subscription;
  private addRecipeSubscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

   ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', [Validators.required]],
      notes: [''],
      products: this.formBuilder.array([]),
      recipes: this.formBuilder.array([]),
    });
    if (this.recipeToEdit) {
      this.populateRecipe(this.recipeToEdit);
    }
    this.addProductSubscription = this.recipeHelperService.productObs$.subscribe(
      (item) => {
        this.setProduct(item);
      },
    );
    this.addRecipeSubscription = this.recipeHelperService.recipeObs$.subscribe(
      (item) => {
        this.setRecipe(item);
      },
    );
  }

  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.addRecipeSubscription.unsubscribe();
  }

  get productsArr() {
    return this.recipeForm.get('products') as FormArray;
  }

  setProduct(item: any): FormArray {
    this.productsArr.push(this.formBuilder.group({
      name: [item.product || item.description],
      recipeItem: [item.code || item.id],
      unit: [item.unit || this.selected, [Validators.required]],
      unitOptions: [item.measures],
      quantity: [item.quantity || '', [Validators.required, Validators.min(0.1)]],
    }));
    return this.productsArr;
  }

  get recipesArr() {
    return this.recipeForm.get('recipes') as FormArray;
  }

  setRecipe(item: any): FormArray {
    this.recipesArr.push(this.formBuilder.group({
      name: [item.recipe || item.title],
      recipeItem: [item.id],
      unit: [item.measure, [Validators.required]],
      unitOptions: [item.measure],
      quantity: [item.quantity || '', [Validators.required, Validators.min(0.1)]],
    }));

    return this.recipesArr;
  }

  populateRecipe(recipe: Recipe): void {
    this.recipeForm.patchValue({title: recipe.title, category: recipe.category, notes: recipe.notes});
    recipe.ingredients.forEach((ingr) => {
      this.setProduct(ingr);
    });
    recipe.subrecipes.forEach((subrec) => {
      this.setRecipe(subrec);
    });
  }

  saveRecipe(recipe) {
    if (this.recipeToEdit) {
      this.update.emit(recipe);
    } else {
      this.create.emit(recipe);
    }
  }

  triggerDeleteProduct(itemsGroupIndex: number) {
    this.productsArr.removeAt(itemsGroupIndex);
    this.productsArr.markAsDirty();
    this.productsArr.markAsTouched();
    // const item = this.recipeHelperService.recipeProducts[itemsGroupIndex];
    // this.recipeHelperService.removeProductFromRecipe(itemsGroupIndex);
    this.delete.emit(itemsGroupIndex);
  }

  triggerDeleteRecipe(itemsGroupIndex: number) {
    this.productsArr.removeAt(itemsGroupIndex);
    this.productsArr.markAsDirty();
    this.productsArr.markAsTouched();
    const item = this.recipeHelperService.recipeProducts[itemsGroupIndex];
    this.recipeHelperService.removeRecipeFromRecipe(itemsGroupIndex);
    this.delete.emit(item);
  }
}
