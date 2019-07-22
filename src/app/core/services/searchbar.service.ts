import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeQuery } from '../../common/models/recipe/recipe-query';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  private searchQueryObs$: BehaviorSubject<RecipeQuery> = new BehaviorSubject(null);
  isSearched = false;

  constructor() { }

  public get searchQuery$() {
    return this.searchQueryObs$.asObservable();
  }

  search(query: RecipeQuery) {
    this.searchQueryObs$.next(query);
    this.isSearched = true;
  }

  clearSearch() {
    this.searchQueryObs$.next(null);
    this.isSearched = false;
  }
}
