import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailedViewService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/recipes/${id}`);
  }
}
