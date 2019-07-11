import { LoggedUser } from './../../common/models/logged-user';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserLogin } from './../../common/models/user-login';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedUser$: BehaviorSubject<LoggedUser | null> = new BehaviorSubject(this.loggedUser);

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router
  ) {
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    } else if (this.isTokenExpired) {
      this.isLoggedUser$.next(null);
      this.router.navigate(['/login']);
    } else {
        this.isLoggedUser$.next(this.loggedUser);
    }
   }

  public get user$() {
    return this.isLoggedUser$.asObservable();
  }

  private get loggedUser(): LoggedUser | null {
    const token = this.storageService.get('token');

    if (token) {
      const loggedUser = {
        username: this.jwtHelper.decodeToken(token).username,
        lastName: this.jwtHelper.decodeToken(token).lastName
      };
      return loggedUser;
    }
    return null;
  }

  private get isTokenExpired(): boolean {
    const token = this.storageService.get('token');
    if (token) {
      return this.jwtHelper.isTokenExpired();
    }
    return false;
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', user).pipe(
      tap((res: any) => {
        const loggedUser = {
          username: this.jwtHelper.decodeToken(res.token).username,
          lastName: this.jwtHelper.decodeToken(res.token).lastName
        };
        this.storageService.set('token', res.token);
        this.isLoggedUser$.next(loggedUser);
      },
      )
    );
  }

  logout(): Observable<any> {
    return this.http.delete('http://localhost:3000/api/logout').pipe(
      tap((res: any) => {
        this.storageService.remove('token');
        this.isLoggedUser$.next(null);
      }
    ));
  }
}
