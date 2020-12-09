import { Component, OnInit } from '@angular/core';
import { AdminService, AdminDataService, CacheService, DataService } from 'src/app/core/service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-define-prize',
  templateUrl: './define-prize.component.html',
  styleUrls: ['./define-prize.component.scss']
})

export class DefinePrizeComponent implements OnInit {

  public p:any;

  public options:any[]=[];


  public sports:any[]=[];
  sport_id:number = 0;
  cur_sport_id:number = 0;
  qbet:number = 0;

  finished:boolean = false;
  from:number = 1;
  count:number = 150;
  date_from:string;
  date_to:string;
  

  selected_match:any;
  matches:any[] = [];
  
  constructor(public cachService: CacheService, 
    public adminBaseService: AdminService,
    public toastrService: ToastrService,
    public adminDataService: AdminDataService) {

    let week = this.cachService.getWeekInfo();
    this.date_from = week.from + "T00:00:00";
    this.date_to = week.to + "T23:59:59";

    this.adminDataService.get_sports(this.cachService.getToken()).then(res=>{
      if(res)
        this.sports = res;
    });

    this.adminBaseService.get_options(this.cachService.getToken()).then(res=>{
      if(res)
      {
        this.options = res;
        this.options.forEach(opt =>{
          opt.value = 0;
        })
      }
    });
  }

  ngOnInit() {

  }

  on_remove_match(ev)
  {
    for(let i=0; i<this.matches.length; i++)
    {
      if(this.matches[i] == ev)
      {
        this.matches.splice(i, 1);
        break;
      }
    }
  }

  on_expand_odds(ev)
  {
    if(ev == this.selected_match)
    {
      this.selected_match = null;
    }
    else
    {
      let odds = JSON.parse(ev.odds);
      this.options.forEach(opt =>{
        if(odds==null)
          opt.value = 0;
        else
          opt.value = odds[opt.key];
      })
      this.selected_match = ev;
    }
  }  

  on_search()
  {
    if(this.sport_id ==0) {
      this.toastrService.info("Please select sport", "Info");
      return;
    }
    let filter = {
      sport: this.sport_id,
      qbet: this.qbet,
      from: this.from,
      count: this.count,
      date_from: this.date_from,
      date_to: this.date_to,
      finished: this.finished
    };

    this.adminDataService.get_fixtures(this.cachService.getToken(), filter).then(res=>
      {
        if(res)
        {
          this.matches = res;
          this.matches.forEach(ev =>{
            ev.updated = false;
          })
        }
      });
      this.cur_sport_id = this.sport_id;       
  }

  on_save_match(ev)
  {    
    let odds = {};
    this.options.forEach(op =>{
      odds[op.key] = op.value;
    })

    let prize = {
      qbet: ev.qbet,
      date: ev.date,
      odds: odds
    }
    this.adminDataService.update_prize(this.cachService.getToken(), this.cur_sport_id, prize).then(res=>{
      if(res)
      {
        ev.odds = res;
        ev.updated = false;
      }
    });
  }


}
