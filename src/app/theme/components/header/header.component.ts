import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { AuthService, CacheService, DatetimeService } from 'src/app/core/service';
import { DatePipe } from '@angular/common';
import { Config } from 'src/app/core/Config';
import { GlobalVar } from 'src/app/core/GlobalVar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  timerCounter = 0;
  public cur_datetime = new Date().toLocaleString();
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public menuItems:Array<any>;  
  constructor(public appSettings:AppSettings, 
      public authService: AuthService,
      public menuService:MenuService,
      public cacheService: CacheService,
      public datetimeService: DatetimeService
      ) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getHorizontalMenuItems();
  }
  
  ngOnInit() {
    if(window.innerWidth <= 768) 
      this.showHorizontalMenu = false;

    let svc = this;
    setInterval(() => {
      svc.cur_datetime = svc.get_date_time();
      svc.timerCounter++;

      //check each 3 seconds      
      if(svc.timerCounter % 3 ==0)
      {
        let user = svc.cacheService.getUser();
        if(user!=null)
        {
          let diffMins = 5;
          if(GlobalVar.balanceUpdateTime!=null)
          {
            var today = new Date();
            let diffMs = today.valueOf() - GlobalVar.balanceUpdateTime.valueOf(); // milliseconds between now & Christmas
            diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
          }  
          if(diffMins >=5)
          {
            this.authService.get_balance(this.cacheService.getToken()).then(res=>{
              GlobalVar.balance = res;
              GlobalVar.balanceUpdateTime = new Date();
            });  
          }
        }  
      }

    },1000);
  }


  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
      for (let i = 0; i < menu.children.length; i++) {
          let child = menu.children[i].children[1];
          if(child){          
              if(child.classList.contains('show')){            
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed'); 
              }             
          }
      }
    }
  }

  on_login()
  {
    jQuery('#login_button').trigger( "click" );
  }

  get_date_time()
  {
    let info = this.cacheService.getTimeInfo();
    if (info== null)
    {
      return new Date().toLocaleString("en-US",{timeZone: Config._defaultLocale});
    }
    let elapsed = Date.now() - info.localtime;      
    let servertime = info.servertime * 1000 + elapsed;
    return info.zone + ", " + new Date(servertime).toLocaleString("en-US",{timeZone: info.zone});
  }

  get_week_info()
  {
    let week = this.cacheService.getWeekInfo();
    if(week==null) return '';
    return 'Week: ' + week.week + ' (' + this.datetimeService.format_date(week.from) + ' ~ ' + this.datetimeService.format_date(week.to) + ')';
  }

  balance()
  {
    return GlobalVar.balance;
  }
  on_refresh_balance()
  {
    this.authService.get_balance(this.cacheService.getToken()).then(res =>{
      GlobalVar.balance = res;
      GlobalVar.balanceUpdateTime = new Date();
    });
  }  

  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 768){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }

  
}
