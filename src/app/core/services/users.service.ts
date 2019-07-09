import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../common/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/${username}`);
  }
}
