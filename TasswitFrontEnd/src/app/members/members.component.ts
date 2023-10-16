import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Party } from '../shared/Party';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  party: Party;

  constructor(public DialogRef: MatDialogRef<MembersComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.party = this.data.user;
    console.log(this.party);

  }
 
  
  onViz(img: string) {
    window.open("/assets/images/partiemaroc/" + img + ".png", '_blank');
  }

  

  
 

}
