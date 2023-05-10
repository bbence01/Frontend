import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },


  { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },

    { path: 'request-list', component: RequestListComponent },

  //  { path: '', component: RequestListComponent },
    { path: 'request/:id', component: RequestDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




 }
