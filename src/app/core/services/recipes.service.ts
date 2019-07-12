import { RecipesData } from './../../common/models/recipe/recipesData';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeQuery } from '../../common/models/recipe/recipe-query';
import { Recipe } from '../../common/models/recipe/recipe';

@Injectable()
export class RecipesService {

  constructor(private readonly http: HttpClient) { }

  getRecipes(query: RecipeQuery): Observable<RecipesData> {
    let queryStr = '';
    if (query.title) {
      queryStr = queryStr.concat(`title=${query.title}&`);
    }

    if (query.category) {
      queryStr = queryStr.concat(`category=${query.category}&`);
    }

    if (query.limit) {
      queryStr = queryStr.concat(`limit=${query.limit}&`);
    }

    if (query.page) {
      queryStr = queryStr.concat(`page=${query.page}`);
    }

    return this.http.get<RecipesData>(`http://localhost:3000/api/recipes?${queryStr}`);
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:3000/api/recipes/${recipeId}`);
  }
}
