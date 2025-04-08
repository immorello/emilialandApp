import { ImageURL } from "./articleData";

export interface MarkerData {
    Count: number;
    Items: returnedMarkerObject[];
    LastEvaluatedKey: Object;
    ResponseMetadata: Object;
    ScannedCount: number;
  }
  
  export interface returnedMarkerObject{
    marker_uuid : markerUuid;
    lng: Lng;
    article_uuid: ArticleUuid;
    incipit: Incipit;
    category: Category;
    article_category: articleCategory;
    image_url: ImageURL;
    lat: Lat;
    title: Title;
  }
  
  export interface markerUuid{
    S : string;
  }
  export interface Lng{
    N : string;
  }
  export interface ArticleUuid{
   S : string;
  }
  export interface Incipit{
    S : string;
  }
  export interface Category{
    S : string;
  }
  export interface articleCategory{
    S : string;
  }
  export interface imageUrl{
    S : string;
  }
  export interface Lat{
    N : string;
  }
  export interface Title{
    S : string;
  }
  