import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
// import { debounce, throttle } from "lodash";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentPosition: any;
  companies: string[];
  index: number = 0;
  timeout: any = null;
  private throttledFunc = this.throttle(() => {
    this.scroll('down');
    console.log('SIGGE')
    this.index++;
  }, 200)

  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    let scroll = e.target['scrollingElement'].scrollTop;
    
    if (scroll > this.currentPosition) {
      console.log('hello')
      // this.throttledScroll();
      this.throttledFunc();
    } else {
      // this.debounce(this.scroll('up'), 100);
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

  private throttledScroll() {
    return this.throttle(() => {
      console.log('CALLED');
      this.scroll('down');
      
    }, 100);
  }

  private scroll(dir: string): any {
    if (dir == 'down') {
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
      this.router.navigate([], { fragment: this.companies[0] });
    } else {
      console.log('Scrolling function got invalid data. DIR: ' + dir);
    }
  }

  private throttle(fun: any, delay: any){
    console.log('here')
    let flag = true;
    return function(){
      if(flag){
        fun();
        flag = false;
        setTimeout(() => flag = true, delay);
      }
    }
  }

}
