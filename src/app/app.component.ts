import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public cubo = [ { position: '-0.5 1   -3', height: '0.4' },
                  { position: '0    1   -3', height: '0.4' },
                  { position: '0.5  1   -3', height: '0.4' },
                  { position: '-0.5 1.5 -3', height: '0.4' },
                  { position: '0    1.5 -3', height: '0.4' },
                  { position: '0.5  1.5 -3', height: '0.4' },
                  { position: '-0.5 2.0 -3', height: '0.4' },
                  { position: '0    2.0 -3', height: '0.4' },
                  { position: '0.5  2.0 -3', height: '0.4' }
                ];

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  onClick($event) {
    event.srcElement.setAttribute('animation', "property: position; dur: 1000; to: 0 1.5 -0.3;");
  }

  onIntersected($event) {
    event.srcElement.setAttribute('animation__2', 'property: position; dur: 1000; to: 5 5 -5;');
  }
}
