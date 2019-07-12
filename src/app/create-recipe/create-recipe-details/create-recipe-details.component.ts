import { Product } from './../../common/models/product/product';
import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
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

  @Input()
  allItems: RecipeItem[] = [];

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  private addItemSubscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() {
    this.addItemSubscription = this.recipeHelperService.obs$.subscribe(
      (item) => {
        setTimeout(() => {
          this.addItemToFormArray(this.allItems);
        }, 0);
        // this.addItemToFormArray(this.allItems);
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

  addItemToFormArray(itmArr): void {
    this.recipeForm.setControl('items', this.setItems(itmArr));
  }

  setItems(itmArr: RecipeItem[]): FormArray {
    const formArray = new FormArray([]);
    itmArr.forEach((itm) => {
      formArray.push(this.formBuilder.group({
        recipeItem: [itm.code || itm.id],
        unit: [itm.measures || itm.measure, [Validators.required]],
        quantity: ['', [Validators.required, Validators.min(0.1)]],
      }));
    });
    console.log(formArray);
    return formArray;
  }

  getIngrName(index: number) {
    const ingredientName = this.allItems[index].title || this.allItems[index].description;

    return ingredientName;
  }

  create(recipe) {
    console.log(recipe);
  }

  triggerDelete(itemsGroupIndex) {
    this.itemsArr.removeAt(itemsGroupIndex);
    this.itemsArr.markAsDirty();
    this.itemsArr.markAsTouched();
    const item = this.allItems[itemsGroupIndex];
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
