import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentPosition: any;
  companies: string[];
  index: number = 0;

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    let scroll = e.target['scrollingElement'].scrollTop;
    if (scroll > this.currentPosition) {
      // USE ANIMATION INSTEAD
      this.scroll('down');
    } else {
      this.scroll('up');
    }
    this.currentPosition = scroll;
  }

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.companies = [
      'jkmholding',
      'jkmsolutions',
      'klassanda'
    ];
  }

  ngOnInit(): void {
    
  }

  private scroll(dir: string): void {
    
    if (dir == 'down') {
      console.log(this.index);
      this.router.navigate([], { fragment: this.companies[this.index + 1] })
        .then(_ => {
          // this.index = this.companies.indexOf();
          this.route.fragment.subscribe(data => {
            if (data) {
              this.index = this.companies.indexOf(data);
              console.log(data);
              console.log('index: ' + this.companies.indexOf(data));
            }
          });
        });
    } else if (dir == 'up') {
      this.router.navigate([], { fragment: this.companies[0] });
    } else {
      console.log('Scrolling function got invalid data. DIR: ' + dir);
    }
  }

}
