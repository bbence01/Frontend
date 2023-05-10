import { Component, OnInit } from '@angular/core';
import { FoodRequest, Ingredient, Offer, CommentF, FoodUser  } from '../models/foodRequest';
import { FoodRequestService } from '../services/foodRequestService';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService, User } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request: FoodRequest = new FoodRequest();
  isRequestOwner: boolean = false;
  offers: Offer[] = [];
  comments: CommentF[] = [];
  private destroy$ = new Subject<void>();
  newComment: string = '';


  constructor(
    private route: ActivatedRoute,
    private foodRequestService: FoodRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadOffers(requestId);
    this.loadComments(requestId);
    if (requestId) {
      this.foodRequestService.getRequestById(requestId).subscribe(request => {
        this.request = request;
        this.checkRequestOwner();
      });
    } else {
      // Handle the case when the 'id' parameter is missing or invalid
      // e.g., show an error message or navigate back to the request list
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkRequestOwner(): void {
    if (this.request) {
      this.authService.getUserProfile()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (currentUser: User) => {
            this.isRequestOwner = currentUser.id === this.request?.requestorId;
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    }
  }



  // Implement other functions for making an offer, adding a comment, and editing request details
  loadOffers(requestId: string): void {
    // Implement a function in your foodRequestService to fetch offers by requestId
    this.foodRequestService.getOffersByRequestId(requestId).subscribe(offers => {
      this.offers = offers;
    });
  }

  loadComments(requestId: string): void {
    // Implement a function in your foodRequestService to fetch comments by requestId
    this.foodRequestService.getCommentsByRequestId(requestId).subscribe(comments => {
      this.comments = comments;
    });
  }

  makeOffer(request: FoodRequest): void {

    let offer = new Offer()

    // Implement a function in your foodRequestService to create an offer
    this.foodRequestService.createOffer(offer).subscribe(createdOffer => {
      this.offers.push(createdOffer);
    });
  }

  addComment(request:FoodRequest, text: String): void {

    let comment = new CommentF(


    )

    // Implement a function in your foodRequestService to create a comment
    this.foodRequestService.createComment(comment).subscribe(createdComment => {
      this.comments.push(createdComment);
    });
  }

  getRequest(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.foodRequestService.getRequestById(requestId).subscribe((request) => {
        this.request = request;
        this.checkRequestOwner();
      });
    }
  }

  acceptOffer(offer: any): void {
    // Implement your logic to accept the offer here
  }
  editRequest(request: FoodRequest): void {
    // Implement your logic to edit the request here
  }



}
