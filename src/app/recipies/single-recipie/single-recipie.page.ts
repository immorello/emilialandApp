import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiGatewayService } from 'src/app/api-gateway.service';
import { Article, Ingredient } from 'src/app/article.model';
import { FrontendService } from 'src/app/frontend.service';

@Component({
  selector: 'app-single-recipie',
  templateUrl: './single-recipie.page.html',
  styleUrls: ['./single-recipie.page.scss'],
  standalone: false,
})
export class SingleRecipiePage implements OnInit {
  loadedArticle: Article;
  uuid: string;
  ingredientsArr: Ingredient[];


  constructor(
    private api: ApiGatewayService,
    private router: Router,
    private frontend: FrontendService
  ) {
    this.uuid = this.router.url.split('/')[2];
    this.loadedArticle = new Article(this.uuid,'',8,8,'','',null,'','');
    this.ingredientsArr = [];
  }

  ngOnInit() {}

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return;
  }

  ionViewWillEnter() {
    this.ingredientsArr = [];
    this.api.getSingleArticle(this.uuid).subscribe((article: Article) => {
      console.log(article);
      let extraContentsArr = article.extraContents;
      if(extraContentsArr != null){
        for (let i = 0; i<extraContentsArr.length;i++){
          console.log(i);
          let singleObj = JSON.parse(extraContentsArr[i]);
          let singleIngredient = new Ingredient(singleObj.ingrediente, singleObj.quantita, singleObj.unita)
          this.ingredientsArr?.push(singleIngredient)
        }
        
      }

      this.loadedArticle = article;
      console.log(this.loadedArticle);
      console.log(this.ingredientsArr);
      
    });
  }
}
