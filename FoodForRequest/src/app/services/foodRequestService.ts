// src/app/services/food-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { FoodRequest, Ingredient } from '../models/foodRequest';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodRequestService {
  private apiUrlGetAll = 'http://localhost:5274/api/Foodrequest/GetAll';
  private FoodRequest = 'http://localhost:5274/api/Foodrequest';
  private apiIngred = 'http://localhost:5274/api/Ingridient';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAll(): Observable<FoodRequest[]> {
    return this.http.get<FoodRequest[]>(this.apiUrlGetAll);
  }

  getOne(id: number): Observable<FoodRequest> {
    return this.http.get<FoodRequest>(`${this.FoodRequest}/${id}`);
  }

  update(foodRequest: FoodRequest): Observable<FoodRequest> {
    return this.http.put<FoodRequest>(`${this.FoodRequest}/${foodRequest.id}`, foodRequest);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.FoodRequest}/${id}`);
  }

  getRequests(): Observable<FoodRequest[]> {
    const apiUrl = `${environment.apiUrl}/food-requests`; // Update this path to match your backend API endpoint
    return this.http.get<FoodRequest[]>(apiUrl);
  }


  getIngredients(): Observable<Ingredient[]> {
    let api = `${this.apiIngred}/GetAll`;
    return this.http.get<Ingredient[]>(api).pipe(
      map((res) => {
        return res as Ingredient[];
      }),

    );

  }


  addIngredientsToRequest(requestId: string, ingredients: Ingredient[]): Observable<FoodRequest> {
    const api = `${environment.apiUrl}Ingridient/${requestId}/addIngredients`;
    return this.http.put<FoodRequest>(api, ingredients, { headers: this.headers }).pipe(
      map((res) => {
        return res as FoodRequest;
      }),

    );
  }

}
