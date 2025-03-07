import { Component, ViewChild } from '@angular/core';
import { FrontendService } from './frontend.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private _menuVisible: boolean;

  constructor(private frontend: FrontendService) {
    this._menuVisible = true;
  }

  ngAfterViewInit() {
    this.frontend.getMessage.subscribe(
      (event:CustomEvent) => { 
        let details = event.detail;
        let scrollY = details.deltaY;
        if(scrollY > 50){
          this.menuVisible = false;
        }else{
          this.menuVisible = true;
        }
      }
    );
  }

  public get menuVisible(){
    return this._menuVisible;
  }

  public set menuVisible(value:boolean){
    this._menuVisible = value;
  }



}
