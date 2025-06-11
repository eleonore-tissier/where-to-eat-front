import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, formatDate, NgFor, NgIf} from '@angular/common';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Season} from '../../models/season';
import {User} from '../../models/user';

@Component({
  selector: 'app-saison',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, ReactiveFormsModule, DatePipe],
  templateUrl: './saison.component.html',
  standalone: true,
  styleUrl: './saison.component.css'
})
export class SaisonComponent implements OnInit {

  seasons: Season[] = [];

  current_season: Season | undefined;

  users: User[] = [];

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCurrentSeason();
    this.getOrderedUsers();
  }

  getCurrentSeason(): void {
    this.whereToEatService.getCurrentSeason()
      .subscribe(response => {
        if (response.status === 200) {
          this.current_season = response.body as Season;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

  getSeasons(): void {
    this.whereToEatService.getSeasons()
      .subscribe(response => {
        if (response.status === 200) {
          this.seasons = response.body as Season[];
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

  getOrderedUsers(): void {
    this.whereToEatService.getUsers()
      .subscribe(response => {
        if (response.status === 200) {
          let users = response.body as User[];
          for (let round = 0; round < users.length; round++) {
            for (let i = users.length-1; i >= 1; i--) {
              if (users[i-1].points < users[i].points) {
                let temp = users[i];
                users[i] = users[i-1];
                users[i-1] = temp;
              }
            }
          }
          this.users = users;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

}
