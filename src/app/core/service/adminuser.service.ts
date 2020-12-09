import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option,UserInfomation} from '../model';
import {Option} from '../model'


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  _status = 0;
  _message = '';
  _api = 'AdminUser_api/';

  constructor(public _http: HttpClient) {
  }

  public get_operators(token:string):Promise<Array<any>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_operators", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_operator(token:string, user:UserInfomation):Promise<number>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "add_operator", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_operator(token:string, user:UserInfomation):Promise<boolean>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "update_operator", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public remove_operator(token:string, id):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_operator", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_agencis(token:string, operator:number=0):Promise<Array<any>>{
    const body = JSON.stringify({token: token, operator:operator});
    const promise = this._http.post(Config._baseUrl + this._api + "get_agencis", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_agency(token:string, user:UserInfomation):Promise<number>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "add_agency", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_agency(token:string, user:UserInfomation):Promise<boolean>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "update_agency", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public remove_agency(token:string, id):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_agency", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public get_users(token:string, agency:number=0):Promise<Array<any>>{
    const body = JSON.stringify({token: token, agency:agency});
    const promise = this._http.post(Config._baseUrl + this._api + "get_users", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public get_all_users(token:string, filter:any):Promise<Array<any>>{
    const body = JSON.stringify({token: token, filter:filter});
    const promise = this._http.post(Config._baseUrl + this._api + "get_all_users", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public add_user(token:string, user:UserInfomation):Promise<number>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "add_user", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_user(token:string, user:UserInfomation):Promise<boolean>{
    const body = JSON.stringify({token: token, user: user});
    const promise = this._http.post(Config._baseUrl + this._api + "update_user", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public remove_user(token:string, id):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_user", body, { headers: Config.createRequestOptions() }).toPromise();

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
