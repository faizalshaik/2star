import { Injectable, ComponentFactoryResolver, NgModuleRef } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Country, FootBallFixture, LeagueData, DayEvents, OptionGroup, CouponData} from '../model';


@Injectable({
  providedIn: 'root'
})
export class BetService {

  _status = 0;
  _message = '';
  _api = 'UserBettingApi/';

  constructor(public _http: HttpClient) {
  }

  public make_bet(token:string, events:any[], under:number, amount:number):Promise<any>{
    const body = JSON.stringify({token: token, events:events, under:under, amount:amount});
    const promise = this._http.post(Config._baseUrl + this._api + "make_bet", body, { headers: Config.createRequestOptions() }).toPromise();

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
  
  public get_bet_list(token:string, filter:any):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_bet_list", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_bet(token:string, bet_id:number):Promise<any>{
    const body = JSON.stringify({token: token, bet_id:bet_id});
    const promise = this._http.post(Config._baseUrl + this._api + "get_bet", body, { headers: Config.createRequestOptions() }).toPromise();

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

  get_bet_for_print(bet_id:number):Promise<any>{
    const body = JSON.stringify({bet_id:bet_id});
    const promise = this._http.post(Config._baseUrl + this._api + "get_bet_for_print", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public get_bet_report(token:string, filter:any):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_bet_report", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_results(token:string, filter:any):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_results", body, { headers: Config.createRequestOptions() }).toPromise();

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
