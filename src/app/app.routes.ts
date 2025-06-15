import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserComponent } from './new-user/new-user.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'newuser', component: NewUserComponent },
  { path : 'main', component: MainPageComponent},
  {path: '**', component: NotFoundPageComponent}
];
