import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../../common/models/recipe/recipe';
import { Subscription } from 'rxjs';
import { isArray } from 'util';
import { RecipeHelperService } from '../services/recipe-helper.service';
import { RecipeItem } from '../../common/models/recipe-item';

@Component({
  selector: 'app-create-recipe-details',
  templateUrl: './create-recipe-details.component.html',
  styleUrls: ['./create-recipe-details.component.css']
})
export class CreateRecipeDetailsComponent implements OnInit {
  recipeForm: FormGroup;

  @Input()
  recipeToEdit: Recipe;

  @Input()
  recipeCategories: string[];

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  private addItemSubscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() {
    this.addItemSubscription = this.recipeHelperService.obs$.subscribe(
      (item: RecipeItem) => {
        this.addItemToFormArray(item);
      },
    );
    this.recipeForm = this.formBuilder.group({
      title: [this.recipeToEdit ? this.recipeToEdit.title : '', [Validators.required, Validators.minLength(5)]],
      category: [this.recipeToEdit ? this.recipeToEdit.category : '', [Validators.required]],
      notes: [this.recipeToEdit ? this.recipeToEdit.notes : ''],
      items: this.formBuilder.array([]),
    });
  }

  get itemsArr() {
    return this.recipeForm.get('items') as FormArray;
  }

  addItemToFormArray(item: RecipeItem): void {
    this.recipeForm.setControl('items', this.setItems(item));
  }

  setItems(item: RecipeItem): FormArray {
    this.itemsArr.push(this.formBuilder.group({
      recipeItem: [item.code || item.id],
      unit: [item.measures || item.measure, [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0.1)]],
    }));

    return this.itemsArr;
  }

  getIngrName(index: number) {
    const ingredientName = this.recipeHelperService.recipeItems[index].title || this.recipeHelperService.recipeItems[index].description;

    return ingredientName;
  }

  createRecipe(recipe) {
    // this.recipeHelperService.clearRecipeItems();
    console.log(recipe);
    this.create.emit(recipe);
  }

  triggerDelete(itemsGroupIndex) {
    this.itemsArr.removeAt(itemsGroupIndex);
    this.itemsArr.markAsDirty();
    this.itemsArr.markAsTouched();
    const item = this.recipeHelperService.recipeItems[itemsGroupIndex];
    this.recipeHelperService.removeItemFromRecipe(itemsGroupIndex);
    this.delete.emit(item);
  }

  // triggerProductDelete(item) {
  //   this.delete.emit(item);
  // }

  // triggerRecipeDelete(item) {
  //   this.delete.emit(item);
  // }

  isUnitArr(unit) {
    return isArray(unit);
  }
}
