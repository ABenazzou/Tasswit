import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './shared/user';
import { Params} from '@angular/router';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteGuardGuard implements CanActivate {
  private user: User;
  private userservice: UserService;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      next.params.pipe(switchMap((params: Params) => this.userservice.getUserById(params['cnie'])))//if switch param on site= get id
      .subscribe( user =>  this.user = user);
      if (this.user.hasRight == false) {
        //this.routes.navigate(['/vote', 1]);
        return false;
        
      }
    return true;
  }
}
