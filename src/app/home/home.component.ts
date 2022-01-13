import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({transform: 'translateX(-40%)'}),
        animate('400ms ease-out', style({transform: 'translateX(0%)'}))
      ])
    ]),
    trigger('slideRight', [
      transition('void => *', [
        style({transform: 'translateX(40%)'}),
        animate('400ms ease-out', style({transform: 'translateX(0%)'}))
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
export class HomeComponent implements OnInit {

  public mainTitle: string;
  public titles: any;

  // Icons
  public faArrowRight: any = faArrowRight;

  constructor(private router: Router) { 
    this.mainTitle = '';
    this.titles = [
      'Here\'s to the crazy ones.',
      'Vi startar & investerar i framtidens bolag.',
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

  // Navigate function
  public navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

}
