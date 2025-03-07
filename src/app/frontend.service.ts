import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  private event = new Subject<CustomEvent>();
  getMessage = this.event.asObservable();

  constructor() { }

  setMessage(event: CustomEvent){
    this.event.next(event);
  }
}
