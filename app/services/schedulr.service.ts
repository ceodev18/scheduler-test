import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class SchedulrService {

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  private baseUrl: string = 'https://scheduler--vaasu.repl.co/api/v1/';
  private isLogin: boolean = false;

  constructor(public http: HttpClient) { }

  public LoginService(url, body): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, {
      username: body.username,
      password: body.password
    })
  }
  
  public registerService(url, body): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, {
      username: body.username,
      password: body.password,
      role: body.role
    })
  }
  
  checkLogin() {
    return this.isLogin;
  }

  public dashboardService(url, userId): Observable<any> {
    if (localStorage.auth) {
      return this.http.post(`${this.baseUrl}${url}`, {
        userId
      }, {
          headers: this.headers
        })
    } else {
      console.log('No User')
    }
  }

  public getDashboardService(url, id): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}${id}`);
  }


  public getUsers(url): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`);
  }

  public createSheduler(body): Observable<any> {
    return this.http.post('https://scheduler--vaasu.repl.co/api/v1/schdlr/', {
      assignerId: body.assignerId,
      assigneeId: body.assigneeId,
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time
    })
  }

  public accepetScheduler(url, id): Observable<any> {
    console.log(`${this.baseUrl}${url}${id}`)
    return this.http.post(`${this.baseUrl}${url}${id}`,
      [
        {
          key: "accepted",
          val: true

        }
      ]
    )
  }
  
}