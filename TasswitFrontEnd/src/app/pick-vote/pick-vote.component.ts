import { Component, OnInit, ViewChild} from '@angular/core';
import { Params, ActivatedRoute ,Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';
import { PartyService } from '../services/party.service';
import { Party } from '../shared/Party';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Vote } from '../shared/Vote';
import { Location } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { UserService } from '../services/user.service';
@Component({
  selector: 'app-pick-vote',
  templateUrl: './pick-vote.component.html',
  styleUrls: ['./pick-vote.component.scss']
})
export class PickVoteComponent implements OnInit {
  user: User;
  parties: Party[];
  VoteForm: FormGroup;
  vote: Vote;
  Chosen: boolean;
  choiceName: string;
  choiceImage: string;
  Validated: boolean;
  validVoter: boolean;
  @ViewChild('vform') voteFormDirective;
  

  constructor(private userservice: UserService,private routes:Router,
    private route: ActivatedRoute, private partyservice: PartyService,private location: Location,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.userservice.getUserById(params['cnie'])))//if switch param on site= get id
    .subscribe( user => { this.user = user;
    if(user.hasRight==false) {
      this.validVoter = false;
    }
  });

    this.partyservice.getParties()
    .subscribe(parties =>this.parties = parties);
    this.validVoter = true;

  }
  formErrors = {
    'choice' : ''
  };

  validationMessages = {
    'choice': {
      'required':      'choice is required.',
    }
  };
  createForm() {
    
    this.VoteForm = this.fb.group({
      choice:['', Validators.required]
    });
    this.VoteForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

   this.onValueChanged(); // (re)set validation messages now

  }
  
 onValueChanged(data?: any) {
    if (!this.VoteForm) { return; }
    const form = this.VoteForm;
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

  goBack(): void {
    this.Chosen = false;
    this.location.back();
  }

  onConfirm(): void {
  
    this.user.hasRight=false;
    this.user.voteId=parseInt(this.vote.choice);
   //later this.user.votepdf//later
    console.log(this.user);
    this.userservice.updateUser(this.user)
    .subscribe(user => this.user = user);
    console.log("NOW");
    console.log(this.user);
    this.Validated=true;
    

  }
  onSubmit() {
    this.user.hasRight = this.user.hasRight;//doesnt work HOW THE FUCK DO U PREVENT THIS
    this.Chosen = true;
    this.vote = this.VoteForm.value;
    this.choiceName = this.parties[parseInt(this.vote.choice) - 1].name;
    this.choiceImage = this.parties[parseInt(this.vote.choice) - 1].image;
    

    /*
    //this is the confirm one
    //observable
    this.user.hasRight=false;
    this.user.voteId=parseInt(this.vote.choice);
   //later this.user.votepdf//later
    console.log(this.user);
    this.userservice.updateUser(this.user)
    .subscribe(user => this.user = user);
    console.log("NOW");
    console.log(this.user);*/

  

  
 
   // if (this.userService.getUser(this.login.cnie.valueOf(), this.login.password.valueOf()) != null) {
     // console.log(this.userService.getUser(this.login.cnie.valueOf(), this.login.password.valueOf()));
      //console.log("UR IN");
    //}
   // console.log(this.login);
    this.VoteForm.reset();
   
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
  
  async onGenerate() {
    console.log(this.user); 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    var hrs = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var seconds = String(today.getSeconds()).padStart(2, '0');
    var timeToday = mm + '/' + dd + '/' + yyyy + ' at ' + hrs + ' : ' + min + ' : ' + seconds;

    let docDefinition = {
      content: [
        {
          text: "Moroccan E-Election Vote Ticket",
          fontSize: 25,
          bold: true,
          alignment: 'center',
          margin: [0 , 10, 0, 0]
        },
        {
          image: await this.getBase64ImageFromURL(
            "/assets/images/logo.png"
          ),
            fit: [60, 60],
            alignment: 'right',
            margin: [0 , 5, 0, 0]
        } ,
        {
          text: 'User with The CNIE: '+ this.user.cnie +' has voted for ' + this.parties[this.user.voteId - 1].name,
          fontSize : 15,
          alignment: 'center',
          margin: [0, 10, 0, 0]
        },
        {
          image: await this.getBase64ImageFromURL(
            "/assets/images/" + this.user.voteId +".png"
          ),
            fit: [200, 200],
            alignment: 'center',
            margin: [0 , 50, 0, 0]
        } ,
        {
          text: 'This File was generated on : '+ timeToday,
          
          fontSize : 15,
          alignment: 'center',
          margin: [0 , 80, 0, 0]
        },      
      ]
    };

    pdfMake.createPdf(docDefinition).open();    
  }
  

}
