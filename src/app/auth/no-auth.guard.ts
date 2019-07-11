import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';


@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => user === null),
      tap(user => {
        if (!user) {
          this.router.navigate(['/recipes']);
        }
      })
    );
  }
}
