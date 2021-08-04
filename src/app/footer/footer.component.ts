import { Component, OnInit } from '@angular/core';

import { faAngleDoubleUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public faAngleDoubleUp: IconDefinition = faAngleDoubleUp;

  constructor() { }

  ngOnInit(): void {
  }

}
