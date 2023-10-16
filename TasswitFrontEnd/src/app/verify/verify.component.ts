import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  user: User;

  constructor(private userservice: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.userservice.getUserById(params['cnie'])))//if switch param on site= get id
    .subscribe( user =>  this.user = user);
  
    console.log(this.user);
  }

}
