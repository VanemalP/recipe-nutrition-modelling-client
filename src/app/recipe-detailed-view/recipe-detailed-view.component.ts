import { Component, OnInit } from '@angular/core';
import { Recipe } from '../common/models/recipe/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeHelperService } from '../core/services/recipe-helper.service';

@Component({
  selector: 'app-recipe-detailed-view',
  templateUrl: './recipe-detailed-view.component.html',
  styleUrls: ['./recipe-detailed-view.component.css']
})
export class RecipeDetailedViewComponent implements OnInit {
  isActive = true;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: any ) => {
      this.recipe = res.recipe;
    });
  }

  updateRecipe() {
    this.recipeHelperService.editRecipe(this.recipe);
  }
}
