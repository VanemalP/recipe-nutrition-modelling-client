import { RecipeHelperService } from './../../core/services/recipe-helper.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../common/models/recipe/recipe';
import { Nutrition } from '../../common/models/nutrition';
import { Nutrient } from '../../common/models/nutrient';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe;

  @Input()
  nutrition: Nutrition;

  @Output()
  view: EventEmitter<string> = new EventEmitter();

  @Output()
  edit: EventEmitter<string> = new EventEmitter();

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  @Output()
  filter: EventEmitter<string> = new EventEmitter();

  calories: Nutrient;
  carbs: Nutrient;
  fat: Nutrient;
  protein: Nutrient;
  total: number;
  data: any;

  constructor(
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() {
    this.calories = this.nutrition.ENERC_KCAL;
    this.carbs = this.nutrition.CHOCDF;
    this.fat = this.nutrition.FAT;
    this.protein = this.nutrition.PROCNT;
    this.total = this.carbs.value * 4 + this.fat.value * 9 + this.protein.value * 4;
    this.data = {
      calories: Math.round(this.calories.value),
      carbs: this.carbs.value,
      fat: this.fat.value,
      protein: this.protein.value
    };
  }

  calcPercentage(nutrient, total, coef): number {
    return this.recipeHelperService.calcPercentage(nutrient, total, coef);
  }

  triggerViewDetails(recipeId: string) {
    this.view.emit(recipeId);
  }

  triggerFilterByCategory(category: string) {
    this.filter.emit(category);
  }

  triggerEdit(recipeId: string) {
    this.edit.emit(recipeId);
  }

  triggerDelete(recipeId: string) {
    this.delete.emit(recipeId);
  }
}
