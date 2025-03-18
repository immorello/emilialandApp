import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { Article } from '../article.model';
import { ApiGatewayService } from '../api-gateway.service';

@Component({
  selector: 'app-reggiani-illustri',
  templateUrl: './reggiani-illustri.page.html',
  styleUrls: ['./reggiani-illustri.page.scss'],
  standalone:false
})
export class ReggianiIllustriPage implements OnInit {

  loadedArticles: Article[];
      constructor(private frontend:FrontendService, private api:ApiGatewayService) {
        this.loadedArticles = [];
      }

  ngOnInit(): void {
    
  }
    
  onScroll(event: CustomEvent){
    this.frontend.setMessage(event);
    return
  }

  ionViewWillEnter(){
    this.api.getArticlesByCategory('reggiani-illustri').subscribe(
      (artcles:Article[])=>{
        this.loadedArticles = artcles;
      }
    )
  }
}
