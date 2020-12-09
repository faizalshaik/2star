import { Injectable, ComponentFactoryResolver, NgModuleRef } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Country, FootBallFixture, LeagueData, DayEvents, OptionGroup, CouponData} from '../model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  _status = 0;
  _message = '';
  _api = 'UserTransactionApi/';

  constructor(public _http: HttpClient) {
  }

  public get_transactions(token:string, filter:any):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_transactions", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public start_deposite(token:string, amount:number):Promise<any>{
    const body = JSON.stringify({token: token, amount:amount});
    const promise = this._http.post(Config._baseUrl + this._api + "start_deposite", body, { headers: Config.createRequestOptions() }).toPromise();

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
