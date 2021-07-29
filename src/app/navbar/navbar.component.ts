import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({transform: 'translateX(-40%)'}),
        animate('400ms ease-out', style({transform: 'translateX(0%)'}))
      ])
    ]),
    trigger('slideRight', [
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('700ms ease-out', style({transform: 'translateX(0%)'}))
      ])
    ]),
    trigger('slideTop', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('300ms ease-out', style({transform: 'translateY(0%)'}))
      ])
    ]),
    trigger('slideBottom', [
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('300ms ease-out', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
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
    this.randomize();
  }

  private randomize(): void {
    const randInt = Math.floor(Math.random() * this.titles.length);
    this.mainTitle =  this.titles[randInt];
  }
}
