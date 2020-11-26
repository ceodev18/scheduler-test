import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SchedulrService } from './../../services/schedulr.service';


@Component({
  selector: 'app-add-scheduler',
  templateUrl: './add-scheduler.component.html',
  styleUrls: ['./add-scheduler.component.css']
})
export class AddSchedulerComponent implements OnInit {

  public schedulerForm: FormGroup;
  public users = [];
  public loading: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _schedulrService: SchedulrService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this._schedulrService.getUsers('user')
      .subscribe(users => {
        users.data.map(val => {
          if (val.role === 0) {
            this.users.push(val);
          }
        })
      });

    this.schedulerForm = this._fb.group({
      assignerId: JSON.parse(localStorage.auth).id,
      assigneeId: '',
      date: '',
      time: '',
      title: '',
      description: ''
    });
  }
  addScheduler() {
    this.loading = true;
    let schedulerDate = {
      // assignerId: '5ad5c2859e8d540212dd0396', // Auth user hardcoded
      assignerId: JSON.parse(localStorage.auth).id,
      assigneeId: this.schedulerForm.value.assigneeId,
      title: this.schedulerForm.value.title,
      description: this.schedulerForm.value.description,
      date: this.schedulerForm.value.date,
      time: this.schedulerForm.value.time
    };
    this._schedulrService.createSheduler(schedulerDate)
      .subscribe(res => {
        this.loading = false;
        this.schedulerForm.reset();
        this._toastrService.success('Succesfully Created..');
      }, err => console.log(err));
  }

}