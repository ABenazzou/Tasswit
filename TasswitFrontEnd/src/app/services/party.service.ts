import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Party } from '../shared/Party';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  parties: Party[];

  constructor(private http: HttpClient) { }
  getParties(): Observable<Party[]> {
    
    console.log(this.http.get<Party[]>(baseURL+'/partis'));
    return this.http.get<Party[]>(baseURL + '/partis');
  }

  getUserById(id: number): Observable<Party> {
    
    console.log(this.http.get<Party[]>(baseURL+'/partis'));
    return this.http.get<Party>(baseURL + '/partis/' + id);
  }
}
