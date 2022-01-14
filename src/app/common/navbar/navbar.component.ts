import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private routerSub: Subscription;
  public url: String = "";

  constructor (private router: Router) {
    // subscribe to router
    this.routerSub = this.router.events.subscribe({
      next: (data) => {
        if (data instanceof NavigationEnd) {
          console.log(data['url']);
          this.url = data['url'];
        }
      }
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if(this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
