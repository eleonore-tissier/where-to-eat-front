import {Component, OnInit, ViewChild} from '@angular/core';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {User} from '../../models/user';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('loginPage') loginForm!: NgForm;

  loggedUser: User = new User();

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router,
  ) {
  }

  onSubmit(): void {
    this.whereToEatService.checkUser(this.loginForm.value.firstName, this.loginForm.value.lastName)
      .subscribe(response => {
        if (
          response.status === 200
        ) {
          this.loggedUser = response.body as User;
          this.router.navigate(['restaurants']).then(() => window.location.reload());
        } else if (response.status === 404) {
          alert('User not found');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
  }
}
