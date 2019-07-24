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

    if (query.nutrient) {
      queryStr = queryStr.concat(`nutrient=${query.nutrient}&`);
    }

    if (query.min) {
      queryStr = queryStr.concat(`min=${query.min}&`);
    }

    if (query.max) {
      queryStr = queryStr.concat(`max=${query.max}&`);
    }

    if (query.orderBy) {
      queryStr = queryStr.concat(`orderBy=${query.orderBy}&`);
    }

    if (query.order) {
      queryStr = queryStr.concat(`order=${query.order}&`);
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

  createRecipe(data) {
    return this.http.post(`http://localhost:3000/api/recipes`, data);
  }

  updateRecipe(recipeId: string, data) {
    return this.http.put(`http://localhost:3000/api/recipes/${recipeId}`, data);
  }

  deleteRecipe(recipeId: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`http://localhost:3000/api/recipes/${recipeId}`);
  }
}
