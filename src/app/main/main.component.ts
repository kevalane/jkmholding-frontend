import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  companies: string[];
  index: number = 0;
  public down = faAngleDoubleDown;

  private scrollSubject = new Subject<number>();
  private scrollObservable = this.scrollSubject.asObservable().pipe(throttleTime(1000));

  // Mousewheel implementation
  @HostListener('mousewheel', ['$event']) scroll(event: WheelEvent) {
    this.scrollSubject.next(event.deltaY);
  }

  // TODO: Add a separate scrollSubject with lower throttle time
  // Keypress implementation (wasd, arrows)
  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.code.toLowerCase();
    if (key == 'arrowdown' || key == 'keys') {
      this.scrollSubject.next(1);
    } else if (key == 'arrowup' || key == 'keyw') {
      this.scrollSubject.next(-1);
    }
  }

  constructor(private router: Router) {
    this.companies = [
      'jkmholding',
      'jkmsolutions',
      'klassanda'
    ];
  }

  ngOnInit(): void {
    this.scrollObservable.subscribe(scroll => {
      console.log(this.index);
      if (scroll > 0) {
        if (this.index == this.companies.length - 1) {
          this.index = 2;
        } else {
          this.scrollPage('down');
          this.index++;
        }
      } else {
        if (this.index == 0) {
          this.index = 0;
        } else {
          this.scrollPage('up');
          this.index--;
        }
      }
    });
  }

  private scrollPage(dir: string): any {
    if (dir == 'down') {
      this.router.navigate([], {fragment: this.companies[this.index + 1]});
    } else if (dir == 'up') {
      this.router.navigate([], { fragment: this.companies[this.index - 1] });
    } else {
      console.log('Scrolling function got invalid data. DIR: ' + dir);
    }
  }

  public nextButtonScroll(): void {
    this.scrollSubject.next(1);
  }

}
