import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../services.service';
//import { ServicesService } from '../services.service';
import { User, UserModel } from '../../API/src/models/user.model';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-new-user',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('',[Validators.required, Validators.minLength(5)])
  })
  
  constructor(private service: ServicesService){}
  newUserFunction() {
    const newUser: User = {
      email: this.form.value.email ||'',
      username: this.form.value.username ||'',
      password: this.form.value.password ||''
    }
   
    this.service.createUser(newUser).subscribe({
      next: () => {
        alert('Added')
        this.form.reset();
        
      },
      error: (err) => console.error('error found', err)
    })
  }
}
