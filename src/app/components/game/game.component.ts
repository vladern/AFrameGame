import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick($event) {
    event.srcElement.setAttribute('animation', "property: position; dur: 1000; to: 0 1.5 -0.3;");
  }

  onIntersected($event) {
    event.srcElement.setAttribute('animation__2', 'property: position; dur: 1000; to: 5 5 -5;');
  }
}
