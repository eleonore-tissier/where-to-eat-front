import { Routes } from '@angular/router';
import {SaisonComponent} from './page/saison/saison.component';
import {RestaurantsComponent} from './page/restaurants/restaurants.component';
import {ProfileComponent} from './page/profile/profile.component';
import {PlanningComponent} from './page/planning/planning.component';
import {VoteComponent} from './page/vote/vote.component';
import {LoginComponent} from './page/login/login.component';
import {AdminComponent} from './page/admin/admin.component';

export const routes: Routes = [
  {path: 'restaurants', component: RestaurantsComponent},
  {path: '', component: LoginComponent},
  {path: 'saison', component: SaisonComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'planning', component: PlanningComponent},
  {path: 'vote', component: VoteComponent},
  {path: 'admin', component: AdminComponent},
];
