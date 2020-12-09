import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Country, FootBallFixture, LeagueData, DayEvents, OptionGroup, SportData} from '../model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  _status = 0;
  _message = '';
  _api = 'DataApi/';

  constructor(public _http: HttpClient) {
  }

  public get_base_infos():Promise<any>{
    let localtime = Date.now();
    const body = JSON.stringify({localtime: localtime});
    const promise = this._http.post(Config._baseUrl + this._api + "get_base_infos", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public get_leagues(token:string, days:string):Promise<Array<SportData>>{
    const body = JSON.stringify({token: token, days:days});
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

  public get_latest_matches(token:string, sport:number, count:number):Promise<any[]>{
    const body = JSON.stringify({token: token, sport: sport, count:count});
    const promise = this._http.post(Config._baseUrl + this._api + "get_latest_matches", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_event(token:string, sport:number, qbet:number):Promise<any>{
    const body = JSON.stringify({token: token, sport: sport, qbet:qbet});
    const promise = this._http.post(Config._baseUrl + this._api + "get_event", body, { headers: Config.createRequestOptions() }).toPromise();

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


  // public get_events_by_league(token:string, kind:string, league:number):Promise<Array<FootBallFixture>>{
  //   const body = JSON.stringify({token: token, kind: kind, league:league});
  //   const promise = this._http.post(Config._baseUrl + this._api + "get_events_by_league", body, { headers: Config.createRequestOptions() }).toPromise();

  //   if (promise == null) {
  //     return Promise.resolve(null);
  //   }

  //   return promise.then((obj) => {
  //     const res = obj as ApiResponse;
  //     this._status = res.status;
  //     this._message = res.message;
      
  //     if (res.status === 200) {
  //       return Promise.resolve(res.data);
  //     }
  //     return Promise.resolve(null);
  //   });
  // }

  public get_odds(token:string, kind:string, match:number):Promise<Array<any>>{
    const body = JSON.stringify({token: token, kind: kind, match:match});
    const promise = this._http.post(Config._baseUrl + this._api + "get_odds", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_leagues_events(token:string, sport_leagues:any, days:string):Promise<Array<LeagueData>>{
    const body = JSON.stringify({token: token, sports: sport_leagues, days: days});
    const promise = this._http.post(Config._baseUrl + this._api + "get_leagues_events", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_upcoming_events(token:string, kind:string, event_count:number):Promise<Array<DayEvents>>{
    const body = JSON.stringify({token: token, kind: kind, event_count:event_count});
    const promise = this._http.post(Config._baseUrl + this._api + "get_upcoming_events", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public get_printing_odds(token:string, day:string, sports:number[], option_groups:number[]):Promise<any>{
    const body = JSON.stringify({token: token, day: day, sports: sports, option_groups:option_groups});
    const promise = this._http.post(Config._baseUrl + this._api + "get_printing_odds", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_options(token:string):Promise<Array<any>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_options", body, { headers: Config.createRequestOptions() }).toPromise();

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


  


}
