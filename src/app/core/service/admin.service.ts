import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {ApiResponse, Group, Group_Option} from '../model';
import {Option} from '../../core/model'


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  _status = 0;
  _message = '';
  _api = 'Admin_api/';

  constructor(public _http: HttpClient) {
  }

  public get_current_week():Promise<any>{
    const promise = this._http.post(Config._baseUrl + this._api + "get_current_week", "", { headers: Config.createRequestOptions() }).toPromise();

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

  public get_options(token:string):Promise<Array<Option>>{
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

  public update_option(token: string, option:Option):Promise<boolean>{
    const body = JSON.stringify({token: token, option:option});
    const promise = this._http.post(Config._baseUrl + this._api + "update_option", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_option(token: string, option:Option):Promise<number>{
    const body = JSON.stringify({token: token, option:option});
    const promise = this._http.post(Config._baseUrl + this._api + "add_option", body, { headers: Config.createRequestOptions() }).toPromise();

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
  public remove_option(token:string, id:number):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_option", body, { headers: Config.createRequestOptions() }).toPromise();

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


  public get_groups(token:string):Promise<Array<Group>>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_groups", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_group(token: string, group:Group):Promise<boolean>{
    const body = JSON.stringify({token: token, group:group});
    const promise = this._http.post(Config._baseUrl + this._api + "update_group", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_group(token: string, group:Group):Promise<number>{
    const body = JSON.stringify({token: token, group:group});
    const promise = this._http.post(Config._baseUrl + this._api + "add_group", body, { headers: Config.createRequestOptions() }).toPromise();

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
  public remove_group(token:string, id:number):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_group", body, { headers: Config.createRequestOptions() }).toPromise();

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
  
  public get_group_options(token:string):Promise<any>{
    const body = JSON.stringify({token: token});
    const promise = this._http.post(Config._baseUrl + this._api + "get_group_options", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public update_group_option(token: string, group_option:Group_Option):Promise<boolean>{
    const body = JSON.stringify({token: token, group_option:group_option});
    const promise = this._http.post(Config._baseUrl + this._api + "update_group_option", body, { headers: Config.createRequestOptions() }).toPromise();

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

  public add_group_option(token: string, group_option:Group_Option):Promise<number>{
    const body = JSON.stringify({token: token, group_option:group_option});
    const promise = this._http.post(Config._baseUrl + this._api + "add_group_option", body, { headers: Config.createRequestOptions() }).toPromise();

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
  public remove_group_option(token:string, id:number):Promise<boolean>{
    const body = JSON.stringify({token: token, id: id});
    const promise = this._http.post(Config._baseUrl + this._api + "remove_group_option", body, { headers: Config.createRequestOptions() }).toPromise();

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
