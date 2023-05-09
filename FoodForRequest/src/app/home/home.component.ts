import { Component, OnInit } from '@angular/core';
import { FoodRequest } from '../models/foodRequest';
import { FoodRequestService } from '../services/requestservice';
import { HttpClient } from '@angular/common/http';
//import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foodRequests: Array<FoodRequest>;
  http: HttpClient
  constructor(http: HttpClient,private foodRequestService: FoodRequestService) {
    this.http = http
    this.foodRequests = []
    this.getAllFood()
  }
/*
  foodRequests: FoodRequest[] = [
    new FoodRequest(1, 'Food Request 1', 'Sample food request 1', 'https://via.placeholder.com/150', 1, new Date(), new Date()),
    new FoodRequest(2, 'Food Request 2', 'Sample food request 2', 'https://via.placeholder.com/150', 2, new Date(), new Date()),
    // Add more food request objects as needed
  ];*/

  public getAllFood() {
    this.http.get<any>('http://localhost:5274/api/Foodrequest/GetAll')
      .subscribe(resp => {
        resp.map((x:any) => { // Change this line to directly map resp
          console.log(x);
          let c = new FoodRequest()

          c.id = x.id
          c.name = x.name
          c.description = x.description
          c.requestorId = x.requestorId
          c.imageUrl = 'https://via.placeholder.com/250'

          this.foodRequests.push(c)
        })
      })
  }



  ngOnInit(): void {
    /*this.foodRequestService.getAll().subscribe(foodRequests => {
      this.foodRequests = foodRequests;
    });*/
  }

}
