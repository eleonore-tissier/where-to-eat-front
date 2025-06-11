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
    this.whereToEatService.getLoggedUser()
      .subscribe(response => {
        if (response.status === 200) {
          this.user = response.body as User;
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }

      });
  }

  protected readonly Role = Role;
}
