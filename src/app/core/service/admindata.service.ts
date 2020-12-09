import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option} from '../model';
import {Option} from '../model'


@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  _status = 0;
  _message = '';
  _api = 'AdminData_api/';

  constructor(public _http: HttpClient) {
  }

  public get_sports(token:string):Promise<Array<any>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_sports", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_countries(token:string, sport:number):Promise<any>{
    const body = JSON.stringify({token: token, sport:sport});
    const promise = this._http.post(Config._baseUrl + this._api + "get_countries", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_custom_fixtures(token:string, sport:number):Promise<any>{
    const body = JSON.stringify({token: token, sport:sport});
    const promise = this._http.post(Config._baseUrl + this._api + "get_custom_fixtures", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_leagues(token:string, sport:number, country:number):Promise<any>{
    const body = JSON.stringify({token: token, sport:sport, country:country});
    const promise = this._http.post(Config._baseUrl + this._api + "get_leagues", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public create_league(token:string, sport:number, country:number, league:string):Promise<any>{
    const body = JSON.stringify({token: token, sport:sport, country:country, league: league});
    const promise = this._http.post(Config._baseUrl + this._api + "create_league", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public create_programs(token:string, sport:number, progs:any[], opts:any[]):Promise<boolean>{
    const body = JSON.stringify({token: token, sport:sport, progs:progs, opts:opts});
    const promise = this._http.post(Config._baseUrl + this._api + "create_programs", body, { headers: Config.createRequestOptions() }).toPromise();

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

  
  public remove_custom_fixture(token:string, sport:number, qbet:number, date:string):Promise<boolean>{
    const body = JSON.stringify({token: token, sport:sport, qbet:qbet, date:date});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_custom_fixture", body, { headers: Config.createRequestOptions() }).toPromise();

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



  public get_fixtures(token:string, filter:any):Promise<any>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_fixtures", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_result(token:string, sport:number, result:any):Promise<boolean>{
    const body = JSON.stringify({token: token, sport:sport, result:result});
    const promise = this._http.post(Config._baseUrl + this._api + "update_result", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_prize(token:string, sport:number, prize:any):Promise<string>{
    const body = JSON.stringify({token: token, sport:sport, prize:prize});
    const promise = this._http.post(Config._baseUrl + this._api + "update_prize", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_latest_result(token: string, filter: any):Promise<Array<any>>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_latest_result", body, { headers: Config.createRequestOptions() }).toPromise();

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
