import { ImgDialogComponent } from './../img-dialog/img-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormGroupDirective } from '@angular/forms';
import { Recipe } from '../../common/models/recipe/recipe';
import { Subscription } from 'rxjs';
import { RecipeHelperService } from '../../core/services/recipe-helper.service';
import { MatDialog } from '@angular/material';

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

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  update: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  @Output()
  changeRecipeItemValue: EventEmitter<any> = new EventEmitter();

  selected = '1 g';
  imageUrl: string;

  private addProductSubscription: Subscription;
  private changeItemValueSubscription: Subscription;
  private addRecipeSubscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly dialog: MatDialog,
  ) { }

   ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      imageUrl: [null],
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', [Validators.required]],
      notes: [''],
      ingredients: this.formBuilder.array([]),
      subrecipes: this.formBuilder.array([]),
    });

    if (this.recipeToEdit) {
      this.populateRecipe(this.recipeToEdit);
    }

    this.addProductSubscription = this.recipeHelperService.productObs$.subscribe(
      (item) => {
        this.setIngredient(item);
      },
    );
    this.addRecipeSubscription = this.recipeHelperService.recipeObs$.subscribe(
      (item) => {
        this.setSubrecipe(item);
      },
    );

    this.changeItemValueSubscription = this.recipeForm.valueChanges.subscribe(
      (changedData) => {
        this.changeRecipeItemValue.emit(changedData);
      },
    );
  }

  ngOnDestroy() {
    this.addProductSubscription.unsubscribe();
    this.addRecipeSubscription.unsubscribe();
    this.changeItemValueSubscription.unsubscribe();
  }

  get ingredientsArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  setIngredient(item: any): FormArray {
    this.ingredientsArr.push(this.formBuilder.group({
      name: [item.product || item.description],
      recipeItem: [item.code || item.id],
      unit: [item.unit || this.selected, [Validators.required]],
      unitOptions: [item.measures],
      quantity: [item.quantity || 0, [Validators.required, Validators.min(0.1)]],
    }));
    return this.ingredientsArr;
  }

  get subrecipesArr() {
    return this.recipeForm.get('subrecipes') as FormArray;
  }

  setSubrecipe(item: any): FormArray {
    this.subrecipesArr.push(this.formBuilder.group({
      name: [item.recipe || item.title],
      recipeItem: [item.id],
      unit: [item.unit || item.measure, [Validators.required]],
      unitOptions: [item.unit || item.measure],
      gramsPerMeasure: [item.gramsPerMeasure],
      quantity: [item.quantity || 0, [Validators.required, Validators.min(0.1)]],
    }));

    return this.subrecipesArr;
  }

  populateRecipe(recipe: Recipe): void {
    this.imageUrl = recipe.imageUrl;
    this.recipeForm.patchValue({imageUrl: recipe.imageUrl, title: recipe.title, category: recipe.category, notes: recipe.notes});
    recipe.ingredients.forEach((ingr) => {
      this.setIngredient(ingr);
    });
    recipe.subrecipes.forEach((subrec) => {
      this.setSubrecipe(subrec);
    });
  }

  saveRecipe(recipe) {
    if (this.recipeToEdit) {
      this.update.emit(recipe);
    } else {
      this.create.emit(recipe);
    }
  }

  triggerDeleteProduct(data) {
    this.ingredientsArr.removeAt(data.index);
    this.delete.emit(data);
  }

  triggerDeleteRecipe(data) {
    this.subrecipesArr.removeAt(data.index);
    this.delete.emit(data);
  }

  openImgDialog(): void {
    const dialogRef = this.dialog.open(ImgDialogComponent, {
      minWidth: '400px',
      autoFocus: false,
      disableClose: true,
      data: {imageUrl: this.imageUrl}
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.imageUrl = result.imageUrl;
          this.recipeForm.get('imageUrl').setValue(this.imageUrl);
        }
      },
    );
  }
}
