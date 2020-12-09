import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {UserInfo} from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // tslint:disable-next-line:variable-name
  constructor(public _local: LocalStorageService) {
  }

  setToken(token: string, expire: number) {
    this._local.set('token', token, expire, 's');
  }

  public getToken(): string {
    return this._local.get('token');
  }

  public getUser():UserInfo{

    let token = this.getToken();
    if(token==null || token=='') return null;

    let data = token.split('.');
    if(data.length!=2) return null;

    let json = atob(data[0]);
    let user = JSON.parse(json);
    if(user == null) return null;
    if(user.id ==undefined) return null;

    return user;
  }
  clearToken()
  {
    this._local.set('token', null, 0, 's');
  }

  clear()
  {
    this._local.clear();
  }

  setTimeInfo(localtime, servertime, zone)
  {
    this._local.set('timeinfo', {localtime:localtime, servertime: servertime, zone: zone}, Date.now()+ 3600 * 24, 's');
  }

  getTimeInfo()
  {
    return this._local.get('timeinfo');    
  }

  setWeekInfo(week)
  {
    this._local.set('weekinfo', week, Date.now()+ 3600 * 24, 's');
  }
  
  getWeekInfo()
  {
    return this._local.get('weekinfo');    
  }

  getCurTime()
  {
    let info = this.getTimeInfo();
    if (info== null)
    {
      return new Date();
    }
    let elapsed = Date.now() - info.localtime;      
    // let servertime = info.servertime * 1000 + elapsed + 3600 * 1000;
    //for nigeria time zone  + 1 hour
    let servertime = info.servertime * 1000 + elapsed + 3600 * 1000;
    return new Date(servertime);
  }  
  
}
