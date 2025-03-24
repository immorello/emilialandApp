import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { last, map, Observable, single, take } from 'rxjs';
import { ArticleData } from './articleData';
import { UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  private apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) {}

  public getAllArticles() {
    const url =
      'https://dwgsfo9djl.execute-api.eu-central-1.amazonaws.com/dev/get-all-articles';

    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
      'Content-Type': 'application/json',
    });

    return this.http.get<ArticleData>(url, { headers }).pipe(
      map((data) => {
        
        let fetchedArticles: Article[] = [];
        let dataLen = data['Count'];

        for (let i = 0; i < dataLen; i++) {
          let singleItem = data['Items'][i];
          let singleArticle = new Article(
            singleItem.article_id.S,
            singleItem.category.S,
            +singleItem.home_order.N,
            +singleItem.category_order.N,
            singleItem.title.S,
            singleItem.incipit.S,
            Array.isArray(singleItem.extra_contents?.SS) ? (singleItem.extra_contents.SS as string[]) : null,
            singleItem.article_text.S,
            singleItem.image_URL.S
          );
          fetchedArticles.push(singleArticle);
        }

        return fetchedArticles.sort((a, b) => a.homeOrder - b.homeOrder);
      })
    );
  }

  public getArticlesByCategory(category: string) {
    const url =
      'https://dwgsfo9djl.execute-api.eu-central-1.amazonaws.com/dev/get-all-articles-by-category?category=' +
      category;

    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
      'Content-Type': 'application/json',
    });
    return this.http.get<ArticleData>(url, { headers }).pipe(
      map((data) => {
        let fetchedArticles: Article[] = [];
        let dataLen = data['Count'];

        for (let i = 0; i < dataLen; i++) {
          let singleItem = data['Items'][i];
          let singleArticle = new Article(
            singleItem.article_id.S,
            singleItem.category.S,
            +singleItem.home_order.N,
            +singleItem.category_order.N,
            singleItem.title.S,
            singleItem.incipit.S,
            Array.isArray(singleItem.extra_contents?.SS) ? (singleItem.extra_contents.SS as string[]) : null,
            singleItem.article_text.S,
            singleItem.image_URL.S
          );
          fetchedArticles.push(singleArticle);
        }

        return fetchedArticles.sort((a, b) => a.homeOrder - b.homeOrder);
      })
    );
  }

  public getSingleArticle(uuid: string) {
    let url =
      'https://dwgsfo9djl.execute-api.eu-central-1.amazonaws.com/dev/get-article-by-id?uuid=' +
      uuid;
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
      'Content-Type': 'application/json',
    });
    return this.http.get<ArticleData>(url, { headers }).pipe(
      last(),
      map((data) => {
        let item = data['Items'][0];
        let fetchedArticle: Article = new Article(
          item.article_id.S,
          item.category.S,
          +item.home_order.N,
          +item.category_order.N,
          item.title.S,
          item.incipit.S,
          Array.isArray(item.extra_contents?.SS) ? (item.extra_contents.SS as string[]) : null,
          item.article_text.S,
          item.image_URL.S
        );
        return {...fetchedArticle};
      })
    );
  }
}
