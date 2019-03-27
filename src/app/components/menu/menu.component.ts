import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TextLine } from 'src/app/shared/text-line/text-line.model';
@Component({
  selector: 'a-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private _leftPanelLines: TextLine[];
  private _rightPanelLines: TextLine[];
  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this._leftPanelLines = [
      { position: "0 0.8 0", text: "Warnign!!", fontSize: "60px" },
      { position: "0 0.6 0", text: "This is a alfa version of the game.", fontSize: "40px" },
      { position: "0 0.4 0", text: "Final version will containt important changes.", fontSize: "40px" },
      { position: "0 0.2 0", text: "The project is under development and undestand it as such.", fontSize: "40px" },
      { position: "0 0 0", text: "The project is under development and undestand it as such.", fontSize: "40px" },
      { position: "0 -0.2 0", text: "Bla bla bla bla bal aklñasdinwn ehreiuan ", fontSize: "40px" },
      { position: "0 -0.4 0", text: "Ñianei bhehaaie ehqahei na neiei ne hey kn .", fontSize: "40px" },
      { position: "0 -0.6 0", text: "Ien qiei fhan ei nein añnei .", fontSize: "40px" },
    ];
    this._rightPanelLines = [
      { position: "0 1.05 0", text: "PLAYER STATISTICS", fontSize: "60px" },
      { position: "-1.06 0.4 0", text: "Levels Played               79", fontSize: "40px" },
      { position: "-1.06 0.2 0", text: "Levels Cleared              20", fontSize: "40px" },
      { position: "1.06 0.4 0", text: "Good Cuts                 20005", fontSize: "40px" },
      { position: "1.06 0.2 0", text: "Bad Cuts                 20", fontSize: "40px" },
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

  get rightPanelLines(): TextLine[] {
    return this._rightPanelLines;
  }

  set rightPanelLines(textLines: TextLine[]) {
    this._rightPanelLines = textLines;
  }

  onPlay($event) {
    event.srcElement.setAttribute('background-color', 'red');
  }

}
