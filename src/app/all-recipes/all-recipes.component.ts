import { ActivatedRoute, Router } from '@angular/router';
import { RecipesData } from './../common/models/recipe/recipesData';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Recipe } from '../common/models/recipe/recipe';
import { Nutrition } from '../common/models/nutrition';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { NotificatorService } from '../core/services/notificator.service';
import { RecipeQuery } from '../common/models/recipe/recipe-query';

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

  private query: RecipeQuery;
  private isFirstLoad = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipesService: RecipesService,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
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
      },
    );

    //not to be called on first come to all recipes 

    this.activatedRoute.queryParams.subscribe(
      (query) => {
        this.query = {...query};
        if (Object.keys(this.query).length > 0) {
          this.query.limit = this.itemsPerPage[0].toString();
        }
        this.recipesService.getRecipes(this.query).subscribe(
          (data) => {
            this.allRecipesData = data;
            this.allRecipes = this.allRecipesData.recipes;
            this.totalRecipes = this.allRecipesData.totalRecipes;
            this.allNutrition = [];
            this.allRecipes.forEach(recipe => {
              const totalNutrition = this.recipeHelperService.calculateTotalRecipeNutrition(recipe);
              this.allNutrition.push(totalNutrition);
            });
          }
        );
      },
    );

  }

  changePagination(pageEvent: PageEvent) {
    const paginationOptions = {
      limit: pageEvent.pageSize.toString(),
      page: (pageEvent.pageIndex + 1).toString(),
    };
    this.recipesService.getRecipes(paginationOptions).subscribe(
      (data) => {
        this.allRecipesData = data;
        this.allRecipes = this.allRecipesData.recipes;
        this.totalRecipes = this.allRecipesData.totalRecipes;
        this.allNutrition = [];
        this.allRecipes.forEach(recipe => {
          const totalNutrition = this.recipeHelperService.calculateTotalRecipeNutrition(recipe);
          this.allNutrition.push(totalNutrition);
        });
      }
    );
  }

  filterByCategory(category: string) {

  }

  viewDetails(recipeId: string) {
    this.router.navigate([`recipes/${recipeId}`]);
  }

  editRecipe(recipe: Recipe) {
    console.log(recipe);
    // this.recipeHelperService.editRecipe(recipe);
  }

  deleteRecipe(recipeId: string) {
    this.recipesService.deleteRecipe(recipeId).subscribe(
      () => {
        const recIndex = this.allRecipes.findIndex(recipe => recipe.id === recipeId);
        this.allRecipes.splice(recIndex, 1);
        this.allNutrition.splice(recIndex, 1);
        this.totalRecipes -= 1;
        this.notificator.success('Recipe successfully deleted.');
      },
    );
  }
}
