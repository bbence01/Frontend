// src/app/services/food-request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { CommentF, FoodRequest, Ingredient, FoodUser, Offer } from '../models/foodRequest';
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
  requests: FoodRequest[] = []
  filteredRequests: FoodRequest[] = [];
  searchTerm: string = '';
  ingredients: Ingredient[] =[]


  constructor(private http: HttpClient) { }
/*
  getAll(): Observable<FoodRequest[]> {
    return this.http.get<FoodRequest[]>(this.apiUrlGetAll);
  }*/

  getAll(): Observable<FoodRequest[]> {
    return this.http
      .get<FoodRequest[]>(`${environment.apiUrl}FoodRequest/GetAll`, {
        headers: this.headers,
      })
      .pipe(
        map((data: any[]) => {
          this.requests = data.map((request) => {
            const req = new FoodRequest();
            req.id = request.id;
            req.name = request.name;
            req.description = request.description;
            req.requestorId = request.requestorId;
            req.imageUrl = "";
            req.ingredients = [];
            return req;
          });
          return this.requests;
        }),
      );
  }





  getIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(`${environment.apiUrl}Ingridient/GetAll`, {
        headers: this.headers,
      })
      .pipe(
        map((data: any[]) => {
          let ingredients = data.map((ingredient) => {
            const ing = new Ingredient();
            ing.id = ingredient.id;
            ing.description = ingredient.description;
            ing.name = ingredient.name;
            ing.foodid = ingredient.foodId; // <-- Update this line
            return ing;
          });
          return ingredients;
        }),
      );
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
    const apiUrl = `${environment.apiUrl}/Foodrequests`; // Update this path to match your backend API endpoint
    return this.http.get<FoodRequest[]>(apiUrl);
  }

  addIngredientsToRequest(requestId: string, ingredients: Ingredient[]): Observable<FoodRequest> {
    const api = `${environment.apiUrl}Ingridient/${requestId}/addIngredients`;
    return this.http.put<FoodRequest>(api, ingredients, { headers: this.headers }).pipe(
      map((res) => {
        return res as FoodRequest;
      }),

    );
  }


  getRequestById(id: string): Observable<FoodRequest> {
    return this.http.get<FoodRequest>(`${this.FoodRequest}/${id}`);
  }


  getComments(): Observable<CommentF[]> {
    return this.http
      .get<Ingredient[]>(`${environment.apiUrl}Comment/GetAll`, {
        headers: this.headers,
      })
      .pipe(
        map((data: any[]) => {
          let comments = data.map((comment) => {
            const ing = new CommentF();
            ing.id = comment.id;
            ing.text = comment.text;
            ing.contractorId = comment.contractorId;
            ing.requestId = comment.requestId; // <-- Update this line
            return ing;
          });
          return comments;
        }),
      );
  }
  getOffers(): Observable<Offer[]> {
    return this.http
      .get<Ingredient[]>(`${environment.apiUrl}Comment/GetAll`, {
        headers: this.headers,
      })
      .pipe(
        map((data: any[]) => {
          let offers = data.map((offer) => {
            const ing = new Offer();
            ing.id = offer.id;
            ing.choosen = offer.choosen;
            ing.contractorId = offer.contractorId;
            ing.foodId = offer.foodId; // <-- Update this line
            return ing;
          });
          return offers;
        }),
      );
  }



  getOffersByRequestId(requestId: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.apiUrl}Offer/GetOffersForRequest/${requestId}`, {
      headers: this.headers,
    });
  }

  getCommentsByRequestId(requestId: string): Observable<CommentF[]> {
    return this.http.get<CommentF[]>(`${environment.apiUrl}Comment/GetCommentsForRequest/${requestId}`, {
      headers: this.headers,
    });
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${environment.apiUrl}Offer`, offer, {
      headers: this.headers,
    });
  }

  createComment(comment: CommentF): Observable<CommentF> {
    return this.http.post<CommentF>(`${environment.apiUrl}Comment`, comment, {
      headers: this.headers,
    });
  }

  updateRequest(request: FoodRequest): Observable<FoodRequest> {
    return this.http.put<FoodRequest>(`${environment.apiUrl}Foodrequest/${request.id}`, request, {
      headers: this.headers,
    });
  }
}
