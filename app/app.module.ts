import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SchedulrService } from './services/schedulr.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderDirective } from './loader.directive';
import { LoaderComponent } from './loader/loader.component';
import { AddSchedulerComponent } from './scheduler/add-scheduler/add-scheduler.component';
import { LoginGuard } from './login.guard';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    canActivate: [LoginGuard],
    component: DashboardComponent
  }
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
    }),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoaderDirective,
    LoaderComponent,
    AddSchedulerComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent],
  providers: [SchedulrService, LoginGuard]
})
export class AppModule { }
