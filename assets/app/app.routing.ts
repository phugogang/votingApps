import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './homepage/homepage.component';
import { ListVoteComponent } from './listVote/listVote.component';
import {NewVoteComponent} from "./newVote/newVote.component";
import {DetailVoteComponent} from './detailVote/detailVote.component';
import {EditVoteComponent} from './editVote/editVote.component';
import {RegisterPageComponent} from './auth/register/register.component';
import {LoginPageComponent} from './auth/login/login.component';
import {MyVoteComponent} from './me/myvote/myvote.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'auth/register', component: RegisterPageComponent},
    {path: 'auth/login', component: LoginPageComponent},
    {path: 'votes', component: ListVoteComponent},
    {path: 'votes/new', component: NewVoteComponent},
    {path: 'votes/:id', component: DetailVoteComponent},
    {path: 'votes/:id/edit', component: EditVoteComponent},
    {path: 'myvote/:id', component: MyVoteComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
