import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { NotificatorService } from '../core/services/notificator.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
    return this.authService.user$.pipe(
      map(user => user !== null),
      tap(user => {
        console.log('no auth g:' + user)
        if (!user) {
          this.notificator.error('You are not authorized to access this page!');
        }
      })
    );
  }
}
