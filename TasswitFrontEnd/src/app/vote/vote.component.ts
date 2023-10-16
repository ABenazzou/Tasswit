import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Login } from '../shared/login';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { Router, RouterModule, Routes } from '@angular/router';
import {routes} from '../app-routing/routes';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  users: User[];
  errMess: string;

  gottenUser: User;
  LoginForm: FormGroup;
  login: Login;
  @ViewChild('lform') loginFormDirective;

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(users =>this.users = users, errmess=> this.errMess = <any> errmess);

    
  }

  formErrors = {
    'cnie': '',
    'password': ''
  };

  validationMessages = {
    'cnie': {
      'required':      'CNIE is required.',
      'minlength':     'CNIE must be at least 6 characters long.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 6 characters long.'//debug later
    }
  };
  createForm() {
    console.log(this.userService.getUsers());
    this.LoginForm = this.fb.group({
      cnie:[ '', [Validators.required, Validators.minLength(6), Validators]],
      password:['', [Validators.required, , Validators.minLength(6)]]
    });
    this.LoginForm.valueChanges
    .subscribe(data => this.onValueChanged(data), errmess=> this.errMess = <any> errmess);

   this.onValueChanged(); // (re)set validation messages now

  }
  
 onValueChanged(data?: any) {
    if (!this.LoginForm) { return; }
    const form = this.LoginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.errMess = '';
    this.login = this.LoginForm.value;
    //observable
    
      this.userService.getUser(this.login.cnie.valueOf(), this.login.password.valueOf())
      .subscribe(user => this.gottenUser = user, errmess=> this.errMess = <any> errmess);
      //if (this.gottenUser.hasRight == false) {
        //no
    
   // if (this.userService.getUser(this.login.cnie.valueOf(), this.login.password.valueOf()) != null) {
     // console.log(this.userService.getUser(this.login.cnie.valueOf(), this.login.password.valueOf()));
      //console.log("UR IN");
    //}
   // console.log(this.login);
   this.LoginForm.reset({
    cnie: '',
    password: ''
  });
    this.loginFormDirective.resetForm();
   
  }


}
