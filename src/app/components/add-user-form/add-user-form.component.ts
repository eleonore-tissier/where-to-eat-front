import {Component, ViewChild} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css'
})
export class AddUserFormComponent {

  @ViewChild('addUserForm') addUserForm!: FormGroup;
}
