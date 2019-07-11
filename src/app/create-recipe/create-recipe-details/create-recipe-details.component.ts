import { Product } from './../../common/models/product/product';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recipe } from '../../common/models/recipe/recipe';

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
  addedProcuts: Product[] = [{
    code: 1001,
    description: 'Butter',
    foodGroup: 'Fats and Oils',
    measures: [{measure: '1 g', gramsPerMeasure: 1}],
    nutrition: {
      PROCNT: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FAT: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      CHOCDF: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      ENERC_KCAL: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      SUGAR: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FIBTG: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      CA: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FE: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      P: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      K: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      NA: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      VITA_IU: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      TOCPHA: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      VITD: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      VITC: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      VITB12: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FOLAC: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      CHOLE: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FATRN: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FASAT: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FAMS: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
      FAPU: {
        desciption: 'nutrDescr',
        unit: 'g',
        value: 1,
      },
    }
  }];
  @Input()
  addedRecipes: Recipe[];

  constructor(
    private readonly formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      title: [this.recipeToEdit ? this.recipeToEdit.title : '', [Validators.required, Validators.minLength(5)]],
      category: [this.recipeToEdit ? this.recipeToEdit.category : '', [Validators.required]],
      notes: [this.recipeToEdit ? this.recipeToEdit.notes : ''],
      // ingredients: this.formBuilder.array([this.createIngredient()])
    });
  }

  // createIngqredient(): FormGroup {
  //   return this.formBuilder.group({
  //     description: '',
  //     unit: '',
  //     quantity: ''
  //   });
  // }

  create(recipe) {
    // console.log(recipe);
  }
}
