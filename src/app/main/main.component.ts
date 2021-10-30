import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentPosition: any;

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    let scroll = e.target['scrollingElement'].scrollTop;
    if (scroll > this.currentPosition) {
      console.log('scrollDown');
    } else {
      console.log('scrollUp');
    }
    this.currentPosition = scroll;
    console.log(this.currentPosition);
  }

  constructor () {
  }

  ngOnInit(): void {
  }

}
