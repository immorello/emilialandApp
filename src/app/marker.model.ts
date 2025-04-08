export class Marker {
    constructor(
        public marker_uuid: string,
        public lng: number,
        public article_uuid: string,
        public incipit: number | string,
        public category: string,
        public article_category: string,
        public image_url:string,
        public lat:number,
        public title: string
    ){}


}