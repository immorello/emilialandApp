import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  @Output() scrolled = new EventEmitter<void>();

  @HostListener('ionScroll',['$event'])
  onScroll(event: Event){
    this.scrolled.emit();
  }
  constructor() {}
  
}
