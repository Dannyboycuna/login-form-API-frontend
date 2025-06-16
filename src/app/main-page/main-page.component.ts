import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../core/models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-main-page',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
////update form
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  showForm: boolean = false;
  index: number = -1;

  /// update form

  
  users: User[] = [];
username: string='';
  userId!: any;
user!: string;
  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    
    this.service.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data
      }
    }); 

  }

  //delete
  optionDelete(id:string, index:number) {   
    this.service.deleteUser(id).subscribe((res:any) => {
      
      this.users.splice(this.users.findIndex(u => u._id == res._id), 1)
      
    });
  }
  updateUser(id: string, user: User) {
  this.service.updateUser(id, user).subscribe((res:any)=>{
    alert('changed')
  })
}

 optionUpdate(index:number) {
    this.showForm = true;
    alert(this.users[index]._id)

    this.form.setValue({
      username: this.users[index].username,
      email: this.users[index].email
    })
  }
  cancelOption() {
    this.showForm = false;
  }
 
  updateOne(id: string, index:number) {
    if (this.form.valid) {
      this.service.updateUser(this.users[index]._id!, this.form.value as User).subscribe({
        next: () => alert('User updated successfully!'),
        error: (err) => console.error(err)
      });
    }
  }
} 
