import { FoodGroupsService } from './foodGroups.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificatorService } from '../../core/services/notificator.service';

@Injectable()
export class FoodGroupsResolverService implements Resolve<string[]> {

  constructor(
    private readonly foodGroupsService: FoodGroupsService,
    private readonly notificator: NotificatorService,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.foodGroupsService.getFoodGroups()
      .pipe(catchError(
        res => {
          console.log(res);
          this.notificator.error(res);

          return of([]);
        }
      ));
  }
}