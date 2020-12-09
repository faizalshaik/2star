import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Config } from '../Config';
import {AuthResult, ApiResponse, UserInfo} from '../model';
import { CacheService } from './cache.service';


@Injectable({
  providedIn: 'root'
})
export class DatetimeService {
  locale: string = Config._defaultLocale;
  constructor(public cacheService:CacheService) {    
    let info = this.cacheService.getTimeInfo();
    if (info!= null)
      this.locale = info.zone;
  }

  format(str)
  {
    return new Date(str).toLocaleString("en-US");
  }
  format_date(datestr) {    
    return new Date(datestr + ' 01:00:00').toLocaleDateString();
  }

  format_weekday(datestr)
  {
    let dt = new Date(datestr + ' 01:00:00');
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[ dt.getDay() ];
  }

  format_time(timestr) {
    let datestr =  '2020-01-01 ' + timestr;
    return new Date(datestr).toLocaleTimeString();
  }  
}
