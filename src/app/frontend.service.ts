import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  private event = new Subject<CustomEvent>();
  getMessage = this.event.asObservable();

  private backButtonEvent = new Subject<String>();
  getBackButtonEvent = this.backButtonEvent.asObservable();

  constructor(private router:Router) {}


  setMessage(event: CustomEvent){
    this.event.next(event);
  }

  setBackButtonStatus(event: String){
    this.backButtonEvent.next(event);
  }
}
