
import { User } from '../../common/models/user/user';
import { UsersService } from '../../core/services/users.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificatorService } from '../../core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
// import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class UserResolverService implements Resolve<User> {

  constructor(
    private readonly usersService: UsersService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const username = route.params.username;

    return this.usersService.getUser(username)
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.message);
          if (res.error.code === 401) {
            this.router.navigate(['/recipes']);
          }
          if (res.error.code === 404) {
            this.router.navigate(['/not-found']);
          }
          return EMPTY;
        }
      ));
  }
}
