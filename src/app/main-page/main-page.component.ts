import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { CommonModule } from '@angular/common';
import { User } from '../../API/src/models/user.model';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-main-page',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  getUsers: User[] = [];
  index: number = -1;
  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    
    this.service.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.getUsers = data
      }
    }); 

  }

  //delete
  optionDelete(index: number) {
    this.index = index;
    alert(index)  
  }

} 