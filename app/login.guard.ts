import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private _router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(localStorage.auth){
      return true;
    }else{
      alert('Your are not logd user, please login first...');
      this._router.navigate(['/']);
      return false;
    }
  }
}
