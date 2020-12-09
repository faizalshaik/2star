import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option} from '../model';
import {Option} from '../model'


@Injectable({
  providedIn: 'root'
})
export class AdminBetService {

  _status = 0;
  _message = '';
  _api = 'AdminBet_api/';

  constructor(public _http: HttpClient) {
  }

  public get_bet_list(token:string, filter:any = null):Promise<Array<any>>{
    const body = JSON.stringify({token: token, filter: filter});
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

  public get_bet_report(token:string, filter:any = null):Promise<any>{
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

  public get_report_of_bettors(token:string, filter:any = null):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_report_of_bettors", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public void_bet(token:string, betid: number):Promise<boolean>{
    const body = JSON.stringify({token: token, betid:betid});
    const promise = this._http.post(Config._baseUrl + this._api + "void_bet", body, { headers: Config.createRequestOptions() }).toPromise();

    if (promise == null) {
      return Promise.resolve(false);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;
      
      if (res.status === 200) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    });
  }


}
