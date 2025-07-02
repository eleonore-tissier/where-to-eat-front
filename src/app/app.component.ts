import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Restaurant} from './models/restaurant';
import {WhereToEatService} from './services/where-to-eat.service';
import {NgFor, NgIf} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {Submission} from './models/submission';
import {RestaurantsComponent} from './page/restaurants/restaurants.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WHERE TO EAT';

}
