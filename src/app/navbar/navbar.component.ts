import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public mainTitle: string;
  public titles: any;

  constructor() { 
    this.mainTitle = '';
    this.titles = [
      'Here\'s to the crazy ones.',
      'Vi startar & investerar i framtidens bolag.',
      'Vi går dit andra inte vågar.',
      'Think different.'
    ];
  }

  ngOnInit(): void {
    this.mainTitle = this.randomizeMainTitle();
  }

  private randomizeMainTitle(): string {
    
    return this.titles[Math.floor(Math.random() * this.titles.length)]
  }
}
