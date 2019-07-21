import { Component, OnInit, Input } from '@angular/core';
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

  calories: Nutrient;
  carbs: Nutrient;
  fat: Nutrient;
  protein: Nutrient;
  total: number;
  data: any;

  constructor() { }

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
    console.log(this.carbs.value * 4 , this.fat.value * 9 , this.protein.value * 4, this.total);
  }

  calcPercentage(nutrient, total, coef): number {
    const percent = Math.round(nutrient * coef * 100 / total);

    return percent;
  }
}
