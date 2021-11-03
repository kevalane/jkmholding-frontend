import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { faAngleDoubleDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  companies: string[];
  index: number = 0;
  public down = faAngleDoubleDown;
  public link = faExternalLinkAlt;

  private scrollSubject = new Subject<number>();
  private scrollObservable = this.scrollSubject.asObservable().pipe(throttleTime(1000));
  private scrollSubjectMouse = new Subject<number>();
  private scrollObservableMouse = this.scrollSubjectMouse.asObservable().pipe(throttleTime(0));

  // Mousewheel implementation
  @HostListener('mousewheel', ['$event']) scroll(event: WheelEvent) {
    this.scrollSubject.next(event.deltaY);
  }

  // TODO: Add a separate scrollSubject with lower throttle time
  // Keypress implementation (wasd, arrows)
  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.code.toLowerCase();
    if (key == 'arrowdown' || key == 'keys') {
      this.scrollSubjectMouse.next(1);
    } else if (key == 'arrowup' || key == 'keyw') {
      this.scrollSubjectMouse.next(-1);
    }
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
      this.handleScroll(scroll);
    });

    // For Mouse
    this.scrollObservableMouse.subscribe(scroll => {
      this.handleScroll(scroll);
    });

    // TODO : check where we are physically instead, dont follow anchor bc unreliable, doesnt always scroll
    const fragmentSub = this.route.fragment.subscribe(data => {
      for (let i = 0; i < this.companies.length; i++) {
        if (data == this.companies[i]) {
          this.index = i;
          console.log(this.index);
          this.router.navigate([], {fragment: this.companies[this.index]});
        }
      }
    });
    fragmentSub.unsubscribe();
  }

  private handleScroll(scroll: number): void {
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
