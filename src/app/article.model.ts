export class Article {
    constructor(
        public uuid: string,
        public category: string,
        public homeOrder: number,
        public categoryOrder: number,
        public title: string,
        public incipit: string,
        public extraContents: string[] | null,
        public articleText:string,
        public articleImageUrl: string
    ){}


}