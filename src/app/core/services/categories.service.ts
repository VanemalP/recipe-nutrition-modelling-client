import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CategoriesService {

  constructor(private readonly http: HttpClient) { }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/api/categories`);
  }
}
