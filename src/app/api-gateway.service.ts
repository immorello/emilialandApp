import { Injectable } from '@angular/core';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  private _articles: Article[] = [
    new Article(
      '815d33dc-97b2-462a-90d8-dbf5f2716cd2',
      'storie-reggiane',
      1,
      1,
      'La grande nevicata del 1991',
      'Una nevicata che scolvolse Reggio',
      null,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://nimelarzan.it/wp-content/uploads/2021/11/6w56mHvA-1024x770.x79746.jpeg'
    ),
    new Article(
      'b532e01b-8d94-4f74-aa05-bfe08e9979a9',
      'storie-reggiane',
      3,
      2,
      'Stadio Mirabello',
      'Lo stadio storico reggiano raccontato bene',
      null,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://nimelarzan.it/wp-content/uploads/2021/06/stadio_mirabello_reggio_emilia-1024x770.x79746.jpg'
    ),
    new Article(
      '00e0dc09-ebd5-4e2b-9986-cb3459a17b78',
      'reggiani-illustri',
      2,
      1,
      'Marco Emilio Lepido',
      'Il fondatore di Reggio Emilia',
      null,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://nimelarzan.it/wp-content/uploads/2019/08/1-Marco-Emilio-Lepido.png'
    ),
    new Article(
      '2c3f1fa3-3357-4cd0-9abb-d3a3bd0d88d0',
      'reggiani-illustri',
      5,
      2,
      'Luciano Ligabue',
      'La rock start correggese che ha rivoluzionato il rock italiano',
      null,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://www.ondefunky.com/wp-content/uploads/2019/03/LIGABUE_START_cover_b.jpg'
    ),
    new Article(
      'b9be0f45-8f1c-472d-a7a6-956cc58b875d',
      'recipies',
      4,
      1,
      'Cappelletti',
      'Il piatto re della tradizione',
      ["carne","parmigiano reggiano","pane"],
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2012/12/ricetta-cappelletti/_jcr_content/header-par/image_single.img.jpg/1480329562633.jpg'
    ),
    new Article(
      '1376a153-f7c1-40c8-a5b8-ef4bbeb478fa',
      'recipies',
      6,
      2,
      'Tortelli verdi',
      'Il must della Vigilia',
      ["bietole","parmigiano reggiano","lardo"],
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet arcu ac iaculis condimentum. Proin felis nibh, scelerisque ac ipsum a, porttitor auctor est. Cras vehicula elit nunc',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQkUlcO8t_tROVX7I1kj4Mq6mQeavjtv2f1QD9feL7HRet_MptaBbiJPNUMlBCc_Fd7wgcVRHx4s6JfKnY2R9-q0UsUCD_rR8F6XfuOVHA'
    ),
  ];

  constructor() {}

  public getArticles(category:string){
    let orderedArticles: Article[] = [];
    if(category == 'all'){
      orderedArticles = this._articles.sort((a,b)=>a.homeOrder - b.homeOrder);
    }else if(category == 'recepies'){
      let filteredArray = this._articles.filter((element)=>element.category == 'recipies');
      orderedArticles = filteredArray.sort((a,b)=>a.categoryOrder - b.categoryOrder);
    }else if(category == 'vip'){
      let filteredArray = this._articles.filter((element)=>element.category == 'reggiani-illustri');
      orderedArticles = filteredArray.sort((a,b)=>a.categoryOrder - b.categoryOrder);
    }else if(category == 'stories'){
      let filteredArray = this._articles.filter((element)=>element.category == 'storie-reggiane');
      orderedArticles = filteredArray.sort((a,b)=>a.categoryOrder - b.categoryOrder);
    }else{
      orderedArticles = []
    }
    return [...orderedArticles]
  }

  public getSingleArticle(uuid:string){
    let loadedArticle: Article = this._articles.filter((element)=>element.uuid == uuid)[0];
    return {...loadedArticle}
  }
}

