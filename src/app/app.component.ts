import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  @ViewChild('homeContent') homeContent:any;
  
  
  constructor() {}

  onPageScroll(event:any){
    console.log(event);
  }
  

  
}
