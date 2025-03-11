import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGatewayService } from 'src/app/api-gateway.service';
import { Article } from 'src/app/article.model';
import { FrontendService } from 'src/app/frontend.service';

@Component({
  selector: 'app-single-recipie',
  templateUrl: './single-recipie.page.html',
  styleUrls: ['./single-recipie.page.scss'],
  standalone: false
})
export class SingleRecipiePage implements OnInit {
  loadedArticle: Article;
  uuid: string;
  constructor(private api:ApiGatewayService, private router: Router, private frontend: FrontendService) {
    this.uuid = this.router.url.split('/')[2];
    this.loadedArticle = this.api.getSingleArticle(this.uuid);
   }

  ngOnInit() {
  }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return
  }
}
