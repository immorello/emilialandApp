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
      this.loadedArticles = api.getArticles('recepies');
    }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return
  }

  ngOnInit() {
  }

}
