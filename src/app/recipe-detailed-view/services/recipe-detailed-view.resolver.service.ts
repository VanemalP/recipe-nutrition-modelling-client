import { RecipeDetailedViewService } from './recipe-detailed-view.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailedViewResolverService implements Resolve<any> {

  constructor(
    private readonly recipeDetailedViewService: RecipeDetailedViewService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.recipeDetailedViewService.getRecipeById(id).pipe(
      catchError(res => {
        return of({});
      })
    );
  }
}
