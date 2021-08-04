import { Component, OnInit } from '@angular/core';
import { faPhone, faSms, faEnvelope, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public faPhone = faPhone;
  public faSms = faSms;
  public faEnvelope = faEnvelope;
  public faLink = faExternalLinkAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
