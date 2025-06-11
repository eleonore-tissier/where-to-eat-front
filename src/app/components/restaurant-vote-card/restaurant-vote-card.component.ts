import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {User} from '../../models/user';
import {Submission} from '../../models/submission';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-restaurant-vote-card',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './restaurant-vote-card.component.html',
  styleUrl: './restaurant-vote-card.component.css'
})
export class RestaurantVoteCardComponent implements OnInit {
  @Input() submission: Submission | undefined;

  user: User | undefined;

  vote_value: boolean = false;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.submission) {
      this.getUser(this.submission.userId);
    }
  }

  getUser(id: number): void {
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

  onSubmit(): void {
    if (this.vote_value && this.user) {
      this.whereToEatService.submitVote(this.user)
        .subscribe(response => {
          if (response.status === 200) {
            this.user = response.body as User;
          } else if (response.status === 401) {
            alert('You are not logged in.');
            this.router.navigate(['login']).then(() => window.location.reload());
          }
        });
    }
  }
}
