import { Component, OnInit, Inject, Input } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
    console.log("Loader here");


  }



}
