import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @HostListener("window:scroll", []) onWindowScroll() {
    console.log('scrolled');
  }

  constructor () {
  }

  ngOnInit(): void {
  }

}
