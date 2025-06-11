import {Component, OnInit} from '@angular/core';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {RestaurantVoteCardComponent} from '../../components/restaurant-vote-card/restaurant-vote-card.component';
import {NgFor} from '@angular/common';
import {Submission} from '../../models/submission';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vote',
  imports: [RestaurantVoteCardComponent, NgFor],
  standalone: true,
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent implements OnInit {

  submissions: Submission[] = [];
  user: User = new User();

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getSubmissions();
  }

  public getSubmissions(): void {
    this.whereToEatService.getSubmissions()
      .subscribe(
        response => {
          if (response.status === 200) {
            this.submissions = response.body as Submission[];
          } else if (response.status === 401) {
            alert('You are not logged in.');
            this.router.navigate(['login']).then(() => window.location.reload());
          }
        });
  }

  public getUser(id: number): User {
    this.whereToEatService.getUser(id)
      .subscribe(response => {
        if (response.status === 200) {
          this.user = response.body as User;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
    return this.user;
  }

}
