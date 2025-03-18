import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { Article } from '../article.model';
import { ApiGatewayService } from '../api-gateway.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.page.html',
  styleUrls: ['./recipies.page.scss'],
  standalone: false
})
export class RecipiesPage implements OnInit {

  loadedArticles: Article[];
    constructor(private frontend:FrontendService, private api:ApiGatewayService) {
      this.loadedArticles = [];
      console.log(this.loadedArticles);
    }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return
  }

  ionViewWillEnter(){
    this.api.getArticlesByCategory('recipies').subscribe(
      (artcles:Article[])=>{
        this.loadedArticles = artcles;
      }
    )
  }

  ngOnInit(): void {
    
  }

}
