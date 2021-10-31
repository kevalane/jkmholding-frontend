import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentPosition: number = 0;
  companies: string[];
  index: number = 0;

  private scrollSubject = new Subject<number>();
  private scrollObservable = this.scrollSubject.asObservable().pipe(throttleTime(600));

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    let scroll = e.target['scrollingElement'].scrollTop;
    this.scrollSubject.next(scroll);
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
    this.scrollObservable.subscribe(scroll => {
      console.log(scroll);
      if (scroll > this.currentPosition) {
        console.log('here going down')
        this.scrollPage('down');
        if (this.index == this.companies.length) {
          this.index = 2;
        } else {
          this.index++;
        }
      } else {
        this.scrollPage('up');
        if (this.index == 0) {
          this.index = 0;
        } else {
          this.index--;
        }
      }
      this.currentPosition = scroll;
    });
  }

  private scrollPage(dir: string): any {
    if (dir == 'down') {
      console.log('awngipagnwpa')
      this.router.navigate([], {fragment: this.companies[this.index + 1]});
      // console.log('called');
      // console.log(this.index);
      // this.router.navigate([], { fragment: this.companies[this.index + 1] })
      //   .then(_ => {
      //     this.route.fragment.subscribe(data => {
      //       if (data) {
      //         this.index = this.companies.indexOf(data);
      //         console.log(data);
      //         console.log('index: ' + this.companies.indexOf(data));
      //       }
      //     });
      //   });
    } else if (dir == 'up') {
      this.router.navigate([], { fragment: this.companies[this.index - 1] });
    } else {
      console.log('Scrolling function got invalid data. DIR: ' + dir);
    }
  }

}
