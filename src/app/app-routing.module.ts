import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TeamsComponent} from './teams/teams.component';
import {TournamentBracketComponent} from './tournament-bracket/tournament-bracket.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tournaments/:id/:shortName', component: TournamentsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'tournament/:id', component: TournamentBracketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
