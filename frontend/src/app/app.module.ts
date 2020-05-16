import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
// Angular Forms Modules
import {  ReactiveFormsModule ,FormsModule} from '@angular/forms'
import { NavbarModule} from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ListCoursComponent } from './Components/list-cours/list-cours.component';
import { DisponibiliteComponent } from './Components/disponibilite/disponibilite.component';
import {TableModule} from "primeng";

import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireMessagingModule} from '@angular/fire/messaging';


import {MessageService} from 'primeng/api';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    FooterComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    ListCoursComponent,
    DisponibiliteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),

        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireMessagingModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,


        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NavbarModule,
        TableModule,
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
