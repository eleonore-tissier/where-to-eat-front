import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {Restaurant} from '../../models/restaurant';
import {WhereToEatService} from '../../services/where-to-eat.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurants',
  imports: [NgFor, FormsModule, NgIf],
  standalone: true,
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {

  @ViewChild('searchRestaurant') searchRestaurant!: NgForm;
  foundRestaurant: Restaurant | undefined;

  @ViewChild('submitRestaurant') submitRestaurant!: NgForm;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.whereToEatService.getRestaurantByName(this.searchRestaurant.value.name)
      .subscribe(response => {
        if (response.status === 200) {
          this.foundRestaurant = response.body as Restaurant;
        }
      });
  }

  onSubmit() {
    this.whereToEatService.submitRestaurant(this.searchRestaurant.value.name, this.submitRestaurant.value.date)
      .subscribe(response => {
        if (response.status === 200) {
          alert('Restaurant submitted successfully');
        }
      });
  }
}
