import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {WhereToEatService} from '../../services/where-to-eat.service';
import {DatePipe, NgForOf} from '@angular/common';
import {Season} from '../../models/season';
import {Router} from '@angular/router';
import {Role} from '../../models/role.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddUserFormComponent} from '../../components/add-user-form/add-user-form.component';

@Component({
  selector: 'app-admin',
  imports: [
    NgForOf,
    DatePipe
  ],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  users: User[] = [];

  current_season: Season | undefined;

  constructor(
    private whereToEatService: WhereToEatService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCurrentSeason();
  }

  public getUsers(): void {
    this.whereToEatService.getUsers()
      .subscribe(response => {
        if (response.status === 200) {
          this.users = response.body as User[];
        } else if (response.status === 401) {
          alert('You are not logged in.');
          this.router.navigate(['login']).then(() => window.location.reload());
        }
      });
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

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    this.dialog.open(AddUserFormComponent, dialogConfig);
  }
}
