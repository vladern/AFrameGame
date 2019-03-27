import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TextLine } from 'src/app/shared/text-line/text-line.model';
@Component({
  selector: 'a-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private _leftPanelLines: TextLine[];
  constructor() { }

  ngOnInit() {
  }

  
  ngAfterViewInit() {
      this._leftPanelLines = [{position: "0 0.8 0", text: "Warnign!!", fontSize: "60px"},
      
      {position: "0 0.6 0", text: "This is a alfa version of the game.", fontSize: "40px"},
      {position: "0 0.4 0", text: "Final version will containt important changes.", fontSize: "40px"},
      {position: "0 0.2 0", text: "The project is under development and undestand it as such.", fontSize: "40px"},
      {position: "0 0 0", text: "The project is under development and undestand it as such.", fontSize: "40px"},
      {position: "0 -0.2 0", text: "Bla bla bla bla bal aklñasdinwn ehreiuan ", fontSize: "40px"},
      {position: "0 -0.4 0", text: "Ñianei bhehaaie ehqahei na neiei ne hey kn .", fontSize: "40px"},
      {position: "0 -0.6 0", text: "Ien qiei fhan ei nein añnei .", fontSize: "40px"},
      ];
  }

  ngAfterViewChecked() {
  }

  get leftPanelLines(): TextLine[] {
    return this._leftPanelLines;
  }

  set liftPanelLines(textLines: TextLine[]) {
    this._leftPanelLines = textLines;
  }

  onPlay($event) {
    event.srcElement.setAttribute('background-color', 'red');
  }

}
