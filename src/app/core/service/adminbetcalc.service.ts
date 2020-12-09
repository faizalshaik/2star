import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option} from '../model';
import {Option} from '../model'


@Injectable({
  providedIn: 'root'
})
export class AdminBetCalcService {

  _status = 0;
  _message = '';
  _api = 'AdminBetCalc_api/';

  constructor(public _http: HttpClient) {
  }

  public calc_results(token:string):Promise<boolean>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "calc_results", body, { headers: Config.createRequestOptions() }).toPromise();

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
