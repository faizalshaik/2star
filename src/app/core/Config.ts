import { HttpHeaders} from '@angular/common/http';
export class Config{    
    static _defaultLocale = 'Africa/Lagos';
    
    static _baseUrl:string = "https://2star.online/backend/";
    //static _baseUrl:string = "//localhost/bettwostar/";

    static createRequestOptions() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
      }
}

