import { ProductsData } from './../../common/models/product/productsData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuery } from '../../common/models/product/product-query';

@Injectable()
export class ProductsService {

  constructor(private readonly http: HttpClient) { }

  getProducts(query: ProductQuery): Observable<ProductsData> {
    let queryStr = '';
    if (query.description) {
      queryStr = queryStr.concat(`description=${query.description}&`);
    }

    if (query.foodGroup) {
      queryStr = queryStr.concat(`foodGroup=${query.foodGroup}&`);
    }

    if (query.limit) {
      queryStr = queryStr.concat(`limit=${query.limit}&`);
    }

    if (query.page) {
      queryStr = queryStr.concat(`page=${query.page}`);
    }

    return this.http.get<ProductsData>(`http://localhost:3000/api/products?${queryStr}`);
  }
}
