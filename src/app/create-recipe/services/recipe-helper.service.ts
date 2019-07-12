import { RecipesData } from './../../common/models/recipe/recipesData';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeHelperService {
  private obs = new Subject();
  public obs$ = this.obs.asObservable();

  constructor() { }

  addItem(item) {
    this.obs.next(item);
  }
}
