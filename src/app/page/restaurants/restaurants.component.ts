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
    this.whereToEatService.getLoggedUser()
      .subscribe(response => {
        console.log(response.status);
        if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
    // this.whereToEatService.getLoggedUser()
    //   .subscribe(response => {
    //     if (response.status === 200) {
    //       const user = response.body as User;
    //       if (user.role !== Role.ADMIN) {
    //         alert('You are not authorized to view this page.');
    //         this.router.navigate(['login']).then(() => window.location.reload());
    //       }
    //     } else if (response.status === 401) {
    //       alert('You are not logged in.');
    //       this.router.navigate(['login']).then(() => window.location.reload());
    //     }
    //   });
  }

  onSearch() {
    this.whereToEatService.getRestaurantByName(this.searchRestaurant.value.name)
      .subscribe(response => {
        if (response.status === 200) {
          this.foundRestaurant = response.body as Restaurant;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

  onSubmit() {
    this.whereToEatService.submitRestaurant(this.searchRestaurant.value.name, this.submitRestaurant.value.date)
      .subscribe(response => {
        if (response.status === 200) {
          alert('Restaurant submitted successfully');
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }
}
