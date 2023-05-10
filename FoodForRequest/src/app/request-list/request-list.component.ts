import { Component, OnInit } from '@angular/core';
import { FoodRequest, Ingredient  } from '../models/foodRequest';
import { FoodRequestService } from '../services/foodRequestService';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';

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

  constructor(private FoodRequestService: FoodRequestService) {

    this.requests = []
    this.ingredients =[]
    this.filteredRequests=[]







  }


  ngOnInit(): void {
    forkJoin([
      this.FoodRequestService.getAll(),
      this.FoodRequestService.getIngredients(),
    ]).subscribe(([requests, ingredients]) => {
      this.requests = requests.map((request) => ({ ...request }));
      this.filteredRequests = [...this.requests];
      this.ingredients = ingredients.map((ingredient) => ({ ...ingredient }));

      console.log('Pairing ingredients to food');
      this.pairIngredientsToFood();
    });
  }


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
        console.log('Matching request:', request);

        if (request) {
          request.ingredients.push(ing);
          console.log('Updated request:', request);
        } else {
          console.log('No matching request found for ingredient:', ing);
        }
      });
    }
  }









}
