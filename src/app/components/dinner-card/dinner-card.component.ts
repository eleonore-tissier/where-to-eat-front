import {Component, Input, OnInit} from '@angular/core';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Submission} from '../../models/submission';
import {User} from '../../models/user';
import {Restaurant} from '../../models/restaurant';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dinner-card',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './dinner-card.component.html',
  styleUrl: './dinner-card.component.css'
})
export class DinnerCardComponent implements OnInit {

  @Input() submission: Submission | undefined;

  user: User | undefined;
  restaurant: Restaurant | undefined;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.submission &&
      this.submission.userId &&
      this.submission.restaurantName
    ) {
      this.getUser(this.submission.userId);
      this.getRestaurant(this.submission.restaurantName)
    }
  }

  public getUser(id: number): void {
    this.whereToEatService.getUser(id)
      .subscribe(response => {
        if (response.status === 200) {
          this.user = response.body as User;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

  public getRestaurant(name: string): void {
    this.whereToEatService.getRestaurantByName(name)
      .subscribe(response => {
        if (response.status === 200) {
          this.restaurant = response.body as Restaurant;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

}
