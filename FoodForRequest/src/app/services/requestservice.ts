// src/app/services/food-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodRequest } from '../models/foodRequest';

@Injectable({
  providedIn: 'root'
})
export class FoodRequestService {
  private apiUrlGetAll = 'http://localhost:5274/api/Foodrequest/GetAll';
  private apiUrl = 'http://localhost:5274/api/Foodrequest';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FoodRequest[]> {
    return this.http.get<FoodRequest[]>(this.apiUrlGetAll);
  }

  getOne(id: number): Observable<FoodRequest> {
    return this.http.get<FoodRequest>(`${this.apiUrl}/${id}`);
  }

  update(foodRequest: FoodRequest): Observable<FoodRequest> {
    return this.http.put<FoodRequest>(`${this.apiUrl}/${foodRequest.id}`, foodRequest);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
