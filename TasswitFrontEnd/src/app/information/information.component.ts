import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onDemo() {
   // console.log("BOO");
    window.open("/assets/pdf/DEMO.pdf", '_blank');

  }

}
