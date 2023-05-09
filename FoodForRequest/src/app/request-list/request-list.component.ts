import { Component, OnInit } from '@angular/core';
import { FoodRequest } from '../models/foodRequest';
import { FoodRequestService } from '../services/foodRequestService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  requests: FoodRequest[] = [];
  filteredRequests: FoodRequest[] = [];
  searchTerm: string = '';

  constructor(private FoodRequestService: FoodRequestService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.FoodRequestService.getAll().subscribe((requests: FoodRequest[]) => {
      this.requests = requests;
      this.filteredRequests = requests;
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

}
