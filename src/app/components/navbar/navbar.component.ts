import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {User} from '../../models/user';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {Role} from '../../models/role.model';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatTooltipModule
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loggedUser: User | undefined;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  protected readonly Role = Role;
}
