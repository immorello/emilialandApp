import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { ApiGatewayService } from '../api-gateway.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {


  loadedArticles: Article[];
  constructor(private frontend:FrontendService, private api:ApiGatewayService) {
    this.loadedArticles = [];
    
  }

  
  
  onScroll(event: CustomEvent){
    this.frontend.setMessage(event);
    return
  }

  ionViewWillEnter(){
    this.frontend.setBackButtonStatus("ENTERED");
    this.api.getAllArticles().subscribe((articles: Article[]) => {
      this.loadedArticles = articles;
  });
  }

  ionViewWillLeave(){
    this.frontend.setBackButtonStatus("LEFT");
  }
}
