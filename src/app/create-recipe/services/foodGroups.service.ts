import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class FoodGroupsService {

  constructor(private readonly http: HttpClient) { }

  getFoodGroups(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/api/food-groups`);
  }
}
