import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchbarService } from '../core/services/searchbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesData } from './../common/models/recipe/recipesData';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { Recipe } from '../common/models/recipe/recipe';
import { Nutrition } from '../common/models/nutrition';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { RecipesService } from '../core/services/recipes.service';
import { NotificatorService } from '../core/services/notificator.service';
import { RecipeQuery } from '../common/models/recipe/recipe-query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit, OnDestroy {
  allRecipesData: RecipesData;
  allRecipes: Recipe[] = [];
  allNutrition: Nutrition[];
  isResolved = false;

  itemsPerPage = [6, 12, 18, 24];
  limit = this.itemsPerPage[0];
  currPage = 1;
  totalRecipes: number;

  sortForm: FormGroup;
  sortQuery = [
    {orderBy: 'recipe.title', order: 'ASC'},
    {orderBy: 'recipe.title', order: 'DESC'},
    {orderBy: 'recipe.created', order: 'DESC'},
    {orderBy: 'recipe.created', order: 'ASC'},
  ];

  private query: RecipeQuery;
  private searchSubscription: Subscription;
  private allRecipesClickedSubscription: Subscription;
  isSearchResult = false;

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipesService: RecipesService,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly searchService: SearchbarService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sortForm = this.formBuilder.group({
      sort: [this.sortQuery[2]]
    });

    this.getResolvedData();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        if (query) {
          this.currPage = 1;
          this.query = {...query};
          const queryCall = {...this.query , limit: this.limit.toString(), page: this.currPage.toString()}
          this.recipesService.getRecipes(queryCall).subscribe(
            (data) => {
              this.updateData(data);
              this.isSearchResult = true;
              if (this.paginator) {
                this.paginator.firstPage();
              }
              this.currPage = 1;
              this.isResolved = true;
            }
          );
        }
      },
    );

    this.allRecipesClickedSubscription = this.recipeHelperService.allRecipesObs$.subscribe(
      () => {
       this.clearSearch();
      },
    );

    this.sortForm.valueChanges.subscribe(
      (sort) => {
        this.query = {...this.query, ...sort.sort};
        this.recipesService.getRecipes({...this.query, limit: this.limit.toString(), page: this.currPage.toString()}).subscribe(
          (data) => {
            this.updateData(data);
            this.isResolved = true;
          }
        );
      },
    );
  }

  ngOnDestroy(): void {
    this.searchService.clearSearch();
    this.searchSubscription.unsubscribe();
    this.allRecipesClickedSubscription.unsubscribe();
  }

  changePagination(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.currPage = pageEvent.pageIndex + 1;
    const paginationOptions = {
      limit: this.limit.toString(),
      page: (this.currPage).toString(),
      ...this.query,
    };
    this.recipesService.getRecipes(paginationOptions).subscribe(
      (data) => {
        this.updateData(data);
        window.scrollTo(0, 0);
       }
    );
  }

  filterByCategory(category: string) {
    this.searchService.search({category});
    window.scrollTo(0, 0);
  }

  clearSearch() {
    this.searchService.clearSearch();
    this.query = null;
    this.getResolvedData();
    this.isResolved = true;
    this.isSearchResult = false;
    this.paginator.firstPage();
    this.currPage = 1;
    window.scrollTo(0, 0);
  }

  viewDetails(recipeId: string) {
    this.router.navigate([`recipes/${recipeId}`]);
  }

  editRecipe(recipeId: string) {
    this.recipesService.getRecipe(recipeId).subscribe((res) => {
      this.recipeHelperService.editRecipe(res);
      this.router.navigate(['recipes/create-edit']);
    });
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

  private getResolvedData() {
    this.activatedRoute.data.subscribe(
      (res) => {
        if (!this.searchService.isSearched) {
          this.updateData(res.recipes);
        }
      },
    );
  }

  private updateData(recipesData: RecipesData) {
    this.allRecipesData = recipesData;
    this.allRecipes = this.allRecipesData.recipes;
    this.totalRecipes = this.allRecipesData.totalRecipes;
    this.allNutrition = [];
    this.allRecipes.forEach(recipe => {
      const totalNutrition = this.recipeHelperService.calculateTotalRecipeNutrition(recipe);
      this.allNutrition.push(totalNutrition);
    });
  }
}
