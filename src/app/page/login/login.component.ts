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

  loggedUser: User | undefined;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router,
  ) {
  }

  onSubmit() {
    this.whereToEatService.login(this.loginForm.value.firstName, this.loginForm.value.lastName)
      .subscribe(response => {
        if (
              response.status === 200
            ) {
              this.loggedUser = response.body as User;
              if (this.loggedUser.id !== undefined) {
                sessionStorage.setItem("loggedUserId", "" + this.loggedUser.id);
              }
              this.router.navigate(['restaurants']).then(() => window.location.reload());
            } else if (response.status === 404) {
              alert('User not found or not logged in');
              this.router.navigate(['']).then(() => window.location.reload());
            }
      });
  }

}
