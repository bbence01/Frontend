import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodRequestService } from '../services/foodRequestService';
import { FoodRequest, Ingredient } from '../models/foodRequest';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request: FoodRequest = new FoodRequest();
  isRequestOwner = false;
  newComment = '';


  constructor(private route: ActivatedRoute, private foodRequestService: FoodRequestService) {}

  ngOnInit(): void {

    const requestId = this.route.snapshot.paramMap.get('id')??'';
    this.foodRequestService.getRequestById(requestId).subscribe((request: FoodRequest) => {
      this.request = request;
      this.checkRequestOwner();
    });
  }

  checkRequestOwner(): void {
    // Replace 'currentUserId' with the actual user ID from your authentication system
    const currentUserId = 'your-logged-in-user-id';
    this.isRequestOwner = this.request.requestorId === currentUserId;
  }

  editRequest(): void {
    // Implement edit request functionality
  }

  makeOffer(): void {
    // Implement make offer functionality
  }

  addComment(): void {
    // Implement add comment functionality
  }

  acceptOffer(offer): void {
    // Implement accept offer functionality




  }
}
