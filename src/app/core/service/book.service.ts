import { Injectable, ComponentFactoryResolver, NgModuleRef } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Country, FootBallFixture, LeagueData, DayEvents, OptionGroup, CouponData} from '../model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  _status = 0;
  _message = '';
  _api = 'UserBookingApi/';

  constructor(public _http: HttpClient) {
  }

  public make_book(token:string, kind:string, events:any[], under:number, amount:number):Promise<any>{
    const body = JSON.stringify({token: token, kind: kind, events:events, under:under, amount:amount});
    const promise = this._http.post(Config._baseUrl + this._api + "make_book", body, { headers: Config.createRequestOptions() }).toPromise();

    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;
      
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }


  public get_book(token:string, book_id:number):Promise<CouponData>{
    const body = JSON.stringify({token: token, book_id: book_id});
    const promise = this._http.post(Config._baseUrl + this._api + "get_book", body, { headers: Config.createRequestOptions() }).toPromise();

    if (promise == null) {
      return Promise.resolve(null);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;
      
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
      return Promise.resolve(null);
    });
  }

}
