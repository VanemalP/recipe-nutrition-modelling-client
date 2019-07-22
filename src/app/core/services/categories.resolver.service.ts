import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriesService } from './categories.service';
import { NotificatorService } from './notificator.service';

@Injectable()
export class CategoriesResolverService implements Resolve<string[]> {

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly notificator: NotificatorService,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.categoriesService.getCategories()
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.message);

          return of([]);
        }
      ));
  }
}
