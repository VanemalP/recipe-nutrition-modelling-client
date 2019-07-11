import { Injectable } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private readonly storageService: StorageService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ) {
    const token = this.storageService.get('token') || '';
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(updatedRequest);
  }

}
