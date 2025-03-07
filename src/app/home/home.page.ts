import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FrontendService } from '../frontend.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  
  constructor(private frontend:FrontendService) {}
  
  onScroll(event: CustomEvent){
    this.frontend.setMessage(event);
    return
  }
}
