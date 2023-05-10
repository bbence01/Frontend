//import { User } from "./user";

import { User } from "../services/auth.service";
/*
/// src/app/models/food-request.model.ts
export class FoodRequest {

  public id: string = "";
 public title: string= "";
 public description: string= "";
 public ingridients: string= "";
 public imageUrl: string ="";
 public pictureContentType: string ="";
 public requestorId: string="";
 public requestor: User  ;
 public offers: string =""




}*/
export class FoodRequest {

  public id: string = "";
 public name: string= "";
 public description: string= "";
 public requestorId: string="";
 public imageUrl: string ="";
 public ingredients: Ingredient[] =[];
 public offers: Offer[] =[];
 public comments: Comment[] =[];

}

export class Ingredient {
  id: string = '';
  description: string = '';
  name: string='';
  foodid: string='';
}

export class Offer{


  id: string = '';
  choosen: string = '';
  foodId: string='';
  contractorId: string='';


}

export class Comment{


  id: string = '';
  text: string = '';
  requestId: string='';
  contractorId: string='';

}

export class FoodUser{


  id: string = '';
  email: string = '';
  foodUserName: string='';
  userName: string='';

}
