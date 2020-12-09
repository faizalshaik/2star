import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option} from '../model';
import {Option} from '../model'


@Injectable({
  providedIn: 'root'
})
export class AdminMaintainService {

  _status = 0;
  _message = '';
  _api = 'AdminMaintain_api/';

  constructor(public _http: HttpClient) {
  }

  public get_fixtures_count(token:string):Promise<Array<any>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_fixtures_count", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public clear_fixtures(token:string, sport:number, date:string):Promise<boolean>{
    const body = JSON.stringify({token: token, sport:sport, date: date});
    const promise = this._http.post(Config._baseUrl + this._api + "clear_fixtures", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_bets_count(token:string):Promise<Array<any>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_bets_count", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public clear_bets(token:string, date:string):Promise<boolean>{
    const body = JSON.stringify({token: token, date: date});
    const promise = this._http.post(Config._baseUrl + this._api + "clear_bets", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public weeks_for_display(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "weeks_for_display", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public save_week(token:string, week:any):Promise<boolean>{
    const body = JSON.stringify({token: token, week:week});
    const promise = this._http.post(Config._baseUrl + this._api + "save_week", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public settings(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "settings", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public save_settings(token:string, setting:any):Promise<boolean>{
    const body = JSON.stringify({token: token, setting:setting});
    const promise = this._http.post(Config._baseUrl + this._api + "save_settings", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public bet_bonus(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "bet_bonus", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_bet_bonus(token:string, bonus:any):Promise<number>{
    const body = JSON.stringify({token: token, bonus: bonus});
    const promise = this._http.post(Config._baseUrl + this._api + "add_bet_bonus", body, { headers: Config.createRequestOptions() }).toPromise();

    if (promise == null) {
      return Promise.resolve(0);
    }

    return promise.then((obj) => {
      const res = obj as ApiResponse;
      this._status = res.status;
      this._message = res.message;
      
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
      return Promise.resolve(0);
    });
  }    
  

  public update_bet_bonus(token:string, bonus:any):Promise<boolean>{
    const body = JSON.stringify({token: token, bonus: bonus});
    const promise = this._http.post(Config._baseUrl + this._api + "update_bet_bonus", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public delete_bet_bonus(token:string, id:number):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "delete_bet_bonus", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public odd_limits(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "odd_limits", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public odd_limit_update(token:string, id:number, max_odd:number, odd_increase:number):Promise<boolean>{
    const body = JSON.stringify({token: token, id:id, max_odd:max_odd, odd_increase:odd_increase});
    const promise = this._http.post(Config._baseUrl + this._api + "odd_limit_update", body, { headers: Config.createRequestOptions() }).toPromise();

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
  

  public commissions(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "commissions", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public commission_update(token:string, id:number, commission:number, max_stake:number, status:boolean):Promise<boolean>{
    const body = JSON.stringify({token: token, id:id, commission:commission, max_stake:max_stake, status:status});
    const promise = this._http.post(Config._baseUrl + this._api + "commission_update", body, { headers: Config.createRequestOptions() }).toPromise();

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
