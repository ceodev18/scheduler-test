import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SchedulrService } from './../services/schedulr.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public schedules: object;
  public schedule: object;
  public month = [];
  public day = [];
  public user: string;
  public loading: boolean = true;
  public sVisible: boolean = false;

  constructor(
    private _schedulrService: SchedulrService,
    private _toastrService: ToastrService,
  ) { }

  openScheduler(id) {
    this.loading = true;
    window.scrollTo(0, 0);
    this._schedulrService.getDashboardService('schdlr/dashboard/', id)
      .subscribe(res => {
        this.loading = false;
        this.schedule = res;
      })
  }
  getSchedulerForm() {
    let auth = JSON.parse(localStorage.auth);
    if (auth.role == 0) {
      this._toastrService.error('You are not Allowed to Create Appoinmnt')
    } else {
      this.sVisible = true;
    }
  }
  /*
  
  */
  accept(id, e: Event) {
    this.loading = true;
    this._schedulrService.accepetScheduler('schdlr/', id)
      .subscribe(res => {
        // Wrong Formula, change later
        this.openScheduler(id);
        this.gettt();
        this.loading = false;
        this._toastrService.success('Challenge Accepted.')
      }, err => console.error(err))
  }

  gettt() {
    let auth = JSON.parse(localStorage.auth);
    this.user = JSON.parse(localStorage.auth);
    if (this.user.role == true) {
      this.loading = false;
    }
    this._schedulrService.dashboardService('schdlr/dashboard/', auth.id)
      .subscribe(res => {
        if (!res.data.length) {
          this.loading = false;
        }
        this.schedules = res.data;
        res.data.map(d => {
          let date = new Date(d.date);
          this.day.push(date.getDate());
          this.month.push(date.toLocaleString('en-us', { month: 'short' }));
          this.loading = false;
        })
      }, err => { console.error(err) });
  }

  logout() {
    localStorage.clear();
  }
  ngOnInit() {
    this.gettt()

  }

}