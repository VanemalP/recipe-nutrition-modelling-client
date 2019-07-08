import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificatorService } from '../core/services/notificator.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor(
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.router.navigate(['/users/login']);
          this.notificator.error(
            'You would be logged in to access this resourse'
          );
        } else if (error.status === 403) {
          this.notificator.error(error.error.message);
        } else if (error.status === 404) {
          this.router.navigate(['/not-found']);
          this.notificator.error('Resource not found!');
        } else if (error.status >= 500) {
          this.router.navigate(['/server-error']);
          this.notificator.error('Oops.. something went wrong.. :(');
        }

        return throwError(error);
      })
    );
  }
}
