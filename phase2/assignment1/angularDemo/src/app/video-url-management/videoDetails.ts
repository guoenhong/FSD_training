export class VideoDetails{
    id:number;
    title:string;
    url:string

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}