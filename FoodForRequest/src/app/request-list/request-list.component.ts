import { Component, OnInit } from '@angular/core';
import { FoodRequest, Ingredient, CommentF,Offer  } from '../models/foodRequest';
import { FoodRequestService } from '../services/foodRequestService';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests: FoodRequest[]
  filteredRequests: FoodRequest[] = [];
  searchTerm: string = '';
  ingredients: Ingredient[]
  selectedIngredient: Ingredient =  new Ingredient;
  offers: Offer[]
  commentsf: CommentF[]
  http: HttpClient

  constructor(http: HttpClient,private FoodRequestService: FoodRequestService) {
    this.http = http
    this.offers =[]
    this.commentsf=[]
    this.ingredients =[]
    this.filteredRequests=[]
    console.log('Ingredients:', this.ingredients);

   // this.getIngredients()

    this.requests = []

    console.log('Requests:', this.requests);
   // this.getAll()
   console.log('Comment:', this.commentsf);
   console.log('Offers:', this.offers);
  this.pairIngredientsToFood()






  }


  ngOnInit(): void {
    forkJoin([
      this.FoodRequestService.getAll(),
      this.FoodRequestService.getIngredients(),
      this.FoodRequestService.getOffers(),
      this.FoodRequestService.getComments(),





    ]).subscribe(([requests, ingredients,offers,commentsf ]) => {
      this.requests = requests;
      this.filteredRequests = requests;
      this.ingredients = ingredients;
      this.offers = offers;
      this.commentsf = commentsf;
      this.pairIngredientsToFood();
      this.pairCommentsToFood();
      this.pairOffesToFood();
    });
  }


//ngOnInit(): void { }
/*
  public getIngredients() {
    this.http.get<any>('http://localhost:5274/api/Ingridient/GetAll')
    .subscribe(resp => {
      resp.ingredients.map((x:any) => {

        let i = new Ingredient()

        i.id = x.id
        i.name =x.name
        i.description =x.description
        i.foodid =x.foodId

        this.ingredients.push(i)
      })
    })
  }





  public getAll() {
    this.http.get<any>('http://localhost:5274/api/Foodrequest/GetAll')
    .subscribe(resp => {
      resp.requests.map((x:any) => {

        let u = new FoodRequest()

        u.id = x.id
        u.name = x.name
        u.description = x.description
        u.requestorId =x.requestorId

        const ingr = this.ingredients.find(c => c.foodid === u.id)
        if(ingr != undefined)
        {
        u.ingredients.push(ingr)
        }


        this.requests.push(u)
      })
    })
  }*/











  searchName(): void {
    this.filteredRequests = this.requests.filter((request) =>
      request.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  searchDescription(): void {
    this.filteredRequests = this.requests.filter((request) =>
      request.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }

  filterRequests(): void {
    if (!this.searchTerm && !this.selectedIngredient) {
      this.filteredRequests = this.requests;

      return;
    }

    this.filteredRequests = this.requests.filter((request) =>
      (!this.searchTerm ||
        request.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedIngredient ||
        (request.ingredients &&
          request.ingredients.some(
            (ingredient) =>
              ingredient.id === this.selectedIngredient.id
          )))
    );

  }

  addIngredients(request: FoodRequest): void {
    // Assuming you have a list of ingredients to add
    const ingredientsToAdd: Ingredient[] = [
      // Add your ingredients here
    ];

    this.FoodRequestService.addIngredientsToRequest(request.id, ingredientsToAdd).subscribe(
      (updatedRequest) => {
        console.log('Updated request:', updatedRequest);
        // Update the local data if needed
        const index = this.requests.findIndex((r) => r.id === updatedRequest.id);
        if (index !== -1) {
          this.requests[index] = updatedRequest;
          this.filterRequests();
        }
      },
      (error) => {
        console.error('Error adding ingredients:', error);
      }
    );
  }


  pairIngredientsToFood() {
    console.log('Ingredients:', this.ingredients);
    console.log('Requests:', this.requests);

    if (this.requests.length > 0 && this.ingredients.length > 0) {
      this.ingredients.forEach(ing => {
        console.log('Ingredient:', ing);
        const request = this.requests.find(request => request.id === ing.foodid);
        console.log('Matching request:', ing.foodid);

        if (request) {
          request.ingredients.push(ing);

          console.log('Matching request found for ingredient:', ing);
        } else {
          console.log('No matching request found for ingredient:', ing);
        }
      });
      console.log('Ingredients:', this.ingredients);
      console.log('Requests:', this.requests);
    }
  }


  pairCommentsToFood() {
    console.log('Comments:', this.commentsf);
    console.log('Requests:', this.requests);

    if (this.requests.length > 0 && this.commentsf.length > 0) {
      this.commentsf.forEach(ing => {
        console.log('Ingredient:', ing);
        const request = this.requests.find(request => request.id === ing.requestId);
        console.log('Matching request:', ing.requestId);

        if (request) {
          request.comments.push(ing);

          console.log('Matching request found for ingredient:', ing);
        } else {
          console.log('No matching request found for ingredient:', ing);
        }
      });
      console.log('comments:', this.commentsf);
      console.log('Requests:', this.requests);
    }
  }

  pairOffesToFood() {
    console.log('Offers:', this.offers);
    console.log('Requests:', this.requests);

    if (this.requests.length > 0 && this.offers.length > 0) {
      this.offers.forEach(ing => {
        console.log('Ingredient:', ing);
        const request = this.requests.find(request => request.id === ing.foodId);
        console.log('Matching request:', ing.foodId);

        if (request) {
          request.offers.push(ing);

          console.log('Matching request found for ingredient:', ing);
        } else {
          console.log('No matching request found for ingredient:', ing);
        }
      });
      console.log('Offers:', this.offers);
      console.log('Requests:', this.requests);
    }
  }







}
