import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  form: FormGroup;  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(8)]]
  })
}

  login() {

    this.http.post<any>('http://localhost:3000/user/login', this.form.value).subscribe({
      next: (response: {token: string}) => {
        console.log('Logged successfully', response);
       localStorage.setItem('token', response.token);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Check your credentials.');
      }
    })
  }
  

}
