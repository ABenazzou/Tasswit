import { Injectable } from '@angular/core';
import { User } from '../shared/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  user: User = {
    cnie: '',
    digitsVerif: '',
    email: '',
    hasRight: true,
    password: '',
    phone: '',
    voteId: -1,
    votepdf: ''
  };

  constructor(private http: HttpClient,  private processHTTPMsgService: ProcessHTTPMsgService) { }
  getUsers(): Observable<User[]> {
    
    console.log(this.http.get<User[]>(baseURL+'/users'));
    return this.http.get<User[]>(baseURL + '/users')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUserById(cnie: string): Observable<User> {
    
    console.log(this.http.get<User[]>(baseURL+'/users'));
    return this.http.get<User>(baseURL + '/users/' + cnie)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUser(cnie: string, password: string): Observable<User> {
    this.user.cnie = cnie;
    this.user.password = password;
    const body = this.user;

    return this.http.post<User>(baseURL + '/users/login', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
      })
      .pipe(catchError(this.processHTTPMsgService.handleError));
    //.subscribe(user => this.user = user);
    //console.log(this.users);
   // if(this.users != null){
    //return of(this.users.filter((user) => (user.cnie == cnie && user.password == password))[0]);//selects
    //}
}

updateUser(user: User): Observable<any> {
  const body = user;
  return this.http.put<User>(baseURL + '/users/' + user.cnie, body, {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })  
  });
 // .subscribe(user => this.user = user);//assigng user but we gotta return before assign
  //body user
}
 /* getUser(cnie: String, password: String): User {
    for (let i = 0; i < 2; i++) {
      if (USERS[i].cnie == cnie && USERS[i].password==password) {
        return USERS[i];
      }
    }
    return null;
  }*/

  sendEmail(user: User): Observable<User> {
    const body = user;
    console.log(baseURL + '/users/email');
    return this.http.put<User>(baseURL + '/users/email', body, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })  
    })
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
