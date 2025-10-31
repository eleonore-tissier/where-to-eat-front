import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {Role} from '../../models/role.model';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
    ) {
  }

  ngOnInit() {
    if (sessionStorage.getItem("loggedUserId") === undefined || sessionStorage.getItem("loggedUserId") === null) {
      alert('User not found or not logged in');
      this.router.navigate(['']).then(() => window.location.reload());
    } else {
      this.whereToEatService.getUser(parseInt(sessionStorage.getItem("loggedUserId") ?? '')).subscribe(response => {
        if (response.status === 200) {
          this.user = response.body as User;
        }
      })
    }
  }

  protected readonly Role = Role;
}
