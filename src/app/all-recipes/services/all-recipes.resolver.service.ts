import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { NotificatorService } from '../../core/services/notificator.service';
import { RecipesService } from '../../core/services/recipes.service';
import { RecipesData } from '../../common/models/recipe/recipesData';

@Injectable()
export class AllRecipesResolverService implements Resolve<RecipesData> {

  constructor(
    private readonly recipesService: RecipesService,
    private readonly notificator: NotificatorService,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const recipesQuery = route.queryParams;

    return this.recipesService.getRecipes(recipesQuery)
      .pipe(catchError(
        res => {
          console.log(res);
          this.notificator.error(res);

          return of(null);
        }
      ));
  }
}