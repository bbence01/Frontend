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
 public payment: number =0;
 public isDone: boolean =  false;
 public inProgress: boolean =  false;
 public deliveryoptions: string= "";
 public requestorId: string="";
 public imageUrl: string ="";
 public ingredients: Ingredient[] =[];
 public offers: Offer[] =[];
 public comments: CommentF[] =[];

}

export class Ingredient {
  public id: string = '';
  public description: string = '';
  public name: string='';
  public foodid: string='';
}

export class Offer{


  public  id: string = '';
  public choosen: boolean = false;
  public foodId: string='';
  public contractorId: string='';


}

export class CommentF{


  public  id: string = '';
  public  text: string = '';
  public requestId: string='';
  public contractorId: string='';

}

export class FoodUser{


  public  id: string = '';
  public email: string = '';
  public foodUserName: string='';
  public userName: string='';
  public founds: number=0;

}
