import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Code } from '../shared/code';
import { User } from '../shared/user';
import { Route } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';


import { UserService } from '../services/user.service';
import { verifyCode } from '../shared/verifyCode';
import { routes } from '../app-routing/routes';
@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent implements OnInit {

  user: User;
  errMsg: string;

  emailForm: FormGroup;
  code: Code;
  verifyCode: boolean;

  codeForm: FormGroup;
  codeDigit: verifyCode;
  allowed: boolean;
  @ViewChild('eform') emailFormDirective;
  @ViewChild('cvform') codeFormDirective;

  constructor(private userservice: UserService,
    private route: ActivatedRoute, private fb: FormBuilder) { 
      this.createForm();
      this.createForm2();
    }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.userservice.getUserById(params['cnie'])))//if switch param on site= get id
    .subscribe( user =>  this.user = user);
  
   
    console.log(this.user);
  }
  createForm() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      checkbox: ['', [Validators.required]]
    });
    this.emailForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

   this.onValueChanged(); // (re)set validation messages now

  }
  createForm2() {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ]
    });
    this.codeForm.valueChanges
    .subscribe(data => this.onValueChanged2(data));

   this.onValueChanged2(); // (re)set validation messages now

  }
  
  formErrors = {
    'email' : '',
    'checkbox': '',
    'code' : ''
  }; 

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'code': {
      'required': '4 Digits Code is Required.',
      'len': 'Code must contain exactly 4 digits'
    }
  };

 onValueChanged(data?: any) {
    if (!this.emailForm) { return; }
    const form = this.emailForm;
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

  onValueChanged2(data?: any) {
    if (!this.codeForm) { return; }
    const form = this.codeForm;
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
    this.errMsg ='';
    this.code = this.emailForm.value;
    this.user.email = this.code.email;
    this.userservice.updateUser(this.user);
    //observable
    console.log(this.user);
    this.userservice.sendEmail(this.user)
    .subscribe(user => this.user = user);
    this.emailForm.reset({
      email: '',
    });
    this.emailFormDirective.resetForm();
    this.verifyCode = true;
   
  }
  onSubmit2() {
    this.errMsg = '';
    this.codeDigit = this.codeForm.value;
    if ( this.user.digitsVerif == this.codeDigit.code) {
      this.allowed = true;
    }
    else {
      this.errMsg = "Wrong 4 Digits Code! Please make sure that you wrote your email correctly."
    }
    this.codeForm.reset({
      code:'',
    });
    this.codeFormDirective.resetForm();
   
  }


}
