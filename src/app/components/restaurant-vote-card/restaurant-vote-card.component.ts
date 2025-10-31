import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {User} from '../../models/user';
import {Submission} from '../../models/submission';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-restaurant-vote-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ],
  standalone: true,
  templateUrl: './restaurant-vote-card.component.html',
  styleUrl: './restaurant-vote-card.component.css'
})
export class RestaurantVoteCardComponent implements OnInit {
  @Input() submission: Submission | undefined;

  targetUser: User | undefined;

  vote_value: boolean = false;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.submission && this.submission.user.id !== undefined) {
      this.getUser(this.submission.user.id);
    }
  }

  getUser(id: number): void {
    this.whereToEatService.getUser(id)
      .subscribe(response => {
        if (response.status === 200) {
          this.targetUser = response.body as User;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }

  onSubmit(vote: boolean): void {
    if (vote === true && this.targetUser) {
      // Submit user's vote and update target user score
      this.whereToEatService.updateUser(this.targetUser)
        .subscribe(response => {
          if (response.status === 200) {
            this.targetUser = response.body as User;
            if (this.targetUser.id !== undefined && this.submission && this.submission.id !== undefined) {
              this.whereToEatService.updateUserSubmission(this.targetUser.id, this.submission.id).subscribe(response => {
                if (response.status === 200) {
                  alert('Votre vote a été enregistré !');
                } else {
                  alert("Oopsie, didn't work!");
                }
              });
            }
          } else if (response.status === 401) {
            alert('You are not logged in.');
            this.router.navigate(['login']).then(() => window.location.reload());
          }
        });
    }
  }
}
