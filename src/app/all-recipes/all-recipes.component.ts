import { ActivatedRoute } from '@angular/router';
import { RecipesData } from './../common/models/recipe/recipesData';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Recipe } from '../common/models/recipe/recipe';
import { Nutrition } from '../common/models/nutrition';
import { RecipeHelperService } from '../core/services/recipe-helper.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  allRecipesData: RecipesData;
  allRecipes: Recipe[];
  allNutrition: Nutrition[] = [];

  itemsPerPage = [6, 12, 18, 24];
  limit = this.itemsPerPage[0];
  currPage = 1;
  totalRecipes: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (res) => {
        this.allRecipesData = res.recipes;
        this.allRecipes = this.allRecipesData.recipes;
        this.totalRecipes = this.allRecipesData.totalRecipes;
        this.allRecipes.forEach(recipe => {
          const totalNutrition = this.recipeHelperService.calculateTotalRecipeNutrition(recipe);
          this.allNutrition.push(totalNutrition);
        });
        console.log(this.allNutrition);
      },
    );

  }

  changePagination(pageEvent: PageEvent) {
    const paginationOptions = {
      limit: pageEvent.pageSize.toString(),
      page: (pageEvent.pageIndex + 1).toString(),
    };

  }

}
