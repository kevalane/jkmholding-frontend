import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentPosition: any;
  companies = document.querySelector('#jkmholding');
  index: number = 0;

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    let scroll = e.target['scrollingElement'].scrollTop;
    if (scroll > this.currentPosition) {
      this.scroll('down');
    } else {
      this.scroll('up');
    }
    this.currentPosition = scroll;
    console.log(this.currentPosition);
  }

  constructor (private router: Router) {
    console.log(this.companies);
  }

  ngOnInit(): void {
    console.log(this.companies);
  }

  private scroll(dir: string): void {
    
    if (dir == 'down') {
      // let company = this.companies[this.index] as HTMLElement;
      // console.log(company)
      // company.scrollIntoView({behavior: 'smooth'});
      this.router.navigate([], { fragment: "klassanda" });
    } else if (dir == 'up') {

    } else {
      console.log('Scrolling function got invalid data. DIR: ' + dir);
    }
  }

}
