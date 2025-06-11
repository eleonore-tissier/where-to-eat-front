import {Component, OnInit} from '@angular/core';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {DinnerCardComponent} from '../../components/dinner-card/dinner-card.component';
import {Submission} from '../../models/submission';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-planning',
  imports: [DinnerCardComponent, NgForOf],
  standalone: true,
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit {

  submissions: Submission[] = [];

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getSubmissions();
  }

  getSubmissions() {
    this.whereToEatService.getSubmissions().subscribe(response => {
      if (response.status === 200) {
        let submissions = response.body as Submission[];
        for (let round = 0; round < submissions.length; round++) {
          for (let i = 0; i < submissions.length-1; i++) {
            if (submissions[i+1].date < submissions[i].date) {
              let temp = submissions[i];
              submissions[i] = submissions[i+1];
              submissions[i+1] = temp;
            }
          }
        }
        this.submissions = submissions;
      } else if (response.status === 401) {
        alert('You are not logged in.');
        this.router.navigate(['login']).then(() => window.location.reload());
      }
    });
  }

}
