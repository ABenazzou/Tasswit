import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Party } from '../shared/Party';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MembersComponent } from '../members/members.component';

@Component({
  selector: 'app-election-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.scss']
})
export class ElectionListComponent implements OnInit {

  parties: Party[];
  showId: number;

  constructor(private partyservice: PartyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.partyservice.getParties()
    .subscribe(parties =>this.parties = parties.filter((party)=>(party.id==7) || (party.id==20 )));
  }

  openDialog(party: Party) {
    this.dialog.open(MembersComponent, {
      height: '98%',
      width: '100vw',
      data: {
        user: party
      }});
  }
}
