import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app.routing';
import {MouseHoverDirective} from './shared/mouseHover.directive';
import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './homepage/homepage.component';
import { AppService } from './app.service';
import { ListVoteComponent } from './listVote/listVote.component';
import {NewVoteComponent} from "./newVote/newVote.component";
import {DetailVoteComponent} from './detailVote/detailVote.component';
import {EditVoteComponent} from './editVote/editVote.component';
import {RegisterPageComponent} from './auth/register/register.component';
import {LoginPageComponent} from './auth/login/login.component';
import {MyVoteComponent} from './me/myvote/myvote.component';



@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule,
                  ReactiveFormsModule,
                  BrowserAnimationsModule,
                  
               
                   ],
  declarations: [ AppComponent,
                  NavbarComponent,
                  HomePageComponent,
                  ListVoteComponent,
                  NewVoteComponent,
                  DetailVoteComponent,
                  EditVoteComponent,
                  LoginPageComponent,
                  RegisterPageComponent,
                  MyVoteComponent,
                  MouseHoverDirective

                ],
  providers: [AppService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
