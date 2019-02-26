import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('circle0') circle0: ElementRef;
  @ViewChild('circle1') circle1: ElementRef;

  @ViewChildren('boxes') boxes: QueryList<ElementRef>;

  public cubo = [{ position: '-0.5 1   -3', height: '0.4' },
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

  onClick(circle: number) {
    if (circle === 0) {
      this.boxes.forEach(element => {
        element.nativeElement.emit('click');
      });
      if (this.circle0.nativeElement.getAttribute('color') === 'blue') {
        this.circle0.nativeElement.setAttribute('color', 'red');
      } else {
        this.circle0.nativeElement.setAttribute('color', 'blue');
      }
    } else {
      if (this.circle1.nativeElement.getAttribute('color') === 'blue') {
        this.circle1.nativeElement.setAttribute('color', 'red');
      } else {
        this.circle1.nativeElement.setAttribute('color', 'blue');
      }
    }
  }

  onIntersected($event) {
    console.log('Position:' + event.srcElement.getAttribute('position'));
    event.srcElement.setAttribute('position', '1 1.5 -1');
  }
}
