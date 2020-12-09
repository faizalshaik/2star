import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CacheService } from 'src/app/core/service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  constructor(public cacheService: CacheService) { }

  ngOnInit() {
  }

  get_name()
  {
    let userInfo = this.cacheService.getUser();
    let name ='Unknown';
    if(userInfo)
    {
      name = userInfo.surname + ' ' + userInfo.name;
    }
    return name;
  }

  get_register_at()
  {
    let userInfo = this.cacheService.getUser();
    let dt ='0000-00-00';
    if(userInfo)
    {
      dt = userInfo.created_at;
    }
    return dt;
  }  
  on_logout()
  {
    jQuery('#logout_button').trigger( "click" );
  }

  get_profile_img()
  {
    let userInfo = this.cacheService.getUser();
    if(userInfo)
    {
      return userInfo.profile_img;
    }
  }
}
