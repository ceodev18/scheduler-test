import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SchedulrService } from './../services/schedulr.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  constructor(
    private _schedulrService: SchedulrService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService,

  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: '',
      password: ''
    });
    if (localStorage.auth) {
      this._router.navigate(['/dashboard']);
    }
  }
  login() {
    this.loading = true;
    let loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    localStorage.removeItem('auth');
    this._schedulrService.LoginService('user/login', loginData)
      .subscribe(res => {
        if (!!res.data) {
          localStorage.setItem('auth', JSON.stringify(res.data));
          this._router.navigate(['/dashboard']);
          this.loading = false;
        } else {
          console.error('Error login data')
          this.loading = false;
          this._toastrService.error('Login Error', 'Please check Username/Password')
        }
      }, err => { console.log(err) })
  }

}