import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-salles-report',
  templateUrl: './m-salles-report.component.html',
  styleUrls: ['./m-salles-report.component.scss']
})
export class MSallesReportComponent implements OnInit {

  options: any;
  optionsLookup: any;
  selectedOption: any;
  alertSelected: any;

  constructor() { }

  ngOnInit() {
  }

}
