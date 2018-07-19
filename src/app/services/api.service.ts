import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductSale } from '../components/analytics.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProdcutRevenue(): Observable<ProductSale[]>{
    return this.http.get<ProductSale[]>("http://localhost:4000/api/products");  
  }
}
