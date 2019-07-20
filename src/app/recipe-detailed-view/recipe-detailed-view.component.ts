import { Subrecipe } from './../common/models/subrecipe';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../common/models/recipe/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { Nutrition } from '../common/models/nutrition';
import { Ingredient } from '../common/models/ingredient';
import { RecipesService } from '../core/services/recipes.service';
import { NotificatorService } from '../core/services/notificator.service';

@Component({
  selector: 'app-recipe-detailed-view',
  templateUrl: './recipe-detailed-view.component.html',
  styleUrls: ['./recipe-detailed-view.component.css']
})
export class RecipeDetailedViewComponent implements OnInit {
  isActive = true;
  recipe: Recipe;
  totalRecipeNutrition: Nutrition;

  constructor(
    private route: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipeService: RecipesService,
    private readonly notificator: NotificatorService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      this.recipe = res.recipe;
      console.log(this.recipe);
      this.totalRecipeNutrition = this.calcRecNutrition(this.recipe);
    });
  }

  updateRecipe() {
    this.recipeHelperService.editRecipe(this.recipe);
  }

  calcRecNutrition(item) {
    return this.recipeHelperService.calculateTotalRecipeNutrition(item);
  }

  calcSubrecNutrition(item) {
    return this.recipeHelperService.calculateSubreciepTotalNutrition(item);
  }

  calcIngrNutrition(item) {
    return this.recipeHelperService.calculateIngredientTotalNutrition(item);
  }

  calcIngrMeasure(item: Ingredient) {
    const gramsPerMeasure = item.measures.find((m) => m.measure === item.unit).gramsPerMeasure;
    return gramsPerMeasure * item.quantity + ' g';
  }

  calcSubrecMeasure(item: Subrecipe) {
    return item.gramsPerMeasure * item.quantity + ' g';
  }

  deleteRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.recipeService.deleteRecipe(id).subscribe(() => {
      this.notificator.success('Recipe successfully deleted');
    });
  }

  setBoldFonts() {
    this.isBold = !this.isBold;
  }
}
