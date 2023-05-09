import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { AuthInterceptor } from '../app/shared/authconfig.interceptor';


import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { SecondaryRegionComponent } from './secondary-region./secondary-region.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    CreateRequestComponent,
    RequestListComponent,
    RequestDetailsComponent,
    UserProfileComponent,
    NavbarComponent,
    FooterComponent,
    // SecondaryRegionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule, // Add CommonModule to the imports array
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
