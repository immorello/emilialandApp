import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { Article } from '../article.model';
import { ApiGatewayService } from '../api-gateway.service';
@Component({
  selector: 'app-storie-reggiane',
  templateUrl: './storie-reggiane.page.html',
  styleUrls: ['./storie-reggiane.page.scss'],
  standalone: false,
})
export class StorieReggianePage implements OnInit {
  loadedArticles: Article[];
  constructor(
    private frontend: FrontendService,
    private api: ApiGatewayService
  ) {
    this.loadedArticles = api.getArticles('stories');
  }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return;
  }

  ngOnInit() {}
}
