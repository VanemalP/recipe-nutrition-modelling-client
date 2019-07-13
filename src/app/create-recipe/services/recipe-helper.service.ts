import { RecipesData } from './../../common/models/recipe/recipesData';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeItem } from '../../common/models/recipe-item';

@Injectable()
export class RecipeHelperService {
  private obs = new Subject();
  public obs$ = this.obs.asObservable();

  private recipeItemsArr: RecipeItem[] = [];

  constructor() { }

  addItemToRecipe(item) {
    this.recipeItemsArr.push(item);
    this.obs.next(item);
  }

  removeItemFromRecipe(index: number): void {
    this.recipeItemsArr.splice(index, 1);
  }

  get recipeItems(): RecipeItem[] {
    return this.recipeItemsArr;
  }

  clearRecipeItems(): void {
    this.recipeItemsArr = [];
    console.log('clear', this.recipeItems);
  }
  // set recipeItems(newRecipeItems: RecipeItem[]) {
  //   this.recipeItemsArr = [...newRecipeItems];
  // }
}
