export interface ArticleData {
  Count: number;
  Items: returnedArticleObject[];
  LastEvaluatedKey: Object;
  ResponseMetadata: Object;
  ScannedCount: number;
}

export interface returnedArticleObject{
  article_id : ArticleId;
  article_text: ArticleText;
  category: Category;
  category_order: CategoryOrder;
  home_order: HomeOrder;
  image_URL: ImageURL;
  incipit: Incipit;
  title: Title;
  extra_contents?: ExtraContents | null ;
}

export interface ArticleId{
  S : string;
}
export interface ArticleText{
  S : string;
}
export interface Category{
 S : string;
}
export interface CategoryOrder{
  N : string;
}
export interface HomeOrder{
  N : string;
}
export interface ImageURL{
  S : string;
}
export interface Incipit{
  S : string;
}
export interface Title{
  S : string;
}
export interface ExtraContents{
  SS : string[];
}
