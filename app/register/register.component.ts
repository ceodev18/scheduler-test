import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SchedulrService } from './../services/schedulr.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup
  public loading: boolean = false;

  constructor(
    private _schedulrService: SchedulrService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      username: '',
      password: '',
      role: 0
    });
  }

  admin() {
    if (!this.registerForm.value.role) {
      this._toastrService.warning('Admin Alert', 'Are You want to  Register as Admin?, Admin can only posting the scheduler. So you required create seperate registration for non admin to view scheduler dashboard')
    }
  }

  register() {
    this.loading = true;
    let registerData = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role ? 1 : 0
    }
    this._schedulrService.registerService('user/register', registerData)
      .subscribe(data => {
        this.loading = false;
        if (data.code == 1102) {
          this._toastrService.success(data.message + '. \nPlease login', data.data.username.toUpperCase())
          this._router.navigate(['/']);
        }

        if (data.err.code === 11000) {
          this._toastrService.error('The user seems already registered', 'Register Error')
        }
      }, err => {
        console.log(err)
      })

  }

}