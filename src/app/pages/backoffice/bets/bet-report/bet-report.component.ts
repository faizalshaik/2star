import { Component, OnInit } from '@angular/core';
import { AdminService, AdminBetService, CacheService, AdminUserService } from 'src/app/core/service';
import { UserInfomation, Option } from 'src/app/core/model';

@Component({
  selector: 'app-bet-report',
  templateUrl: './bet-report.component.html',
  styleUrls: ['./bet-report.component.scss']
})
export class BetReportComponent implements OnInit {

  public p:any;

  public sport:number = 0;
  public days:any[] = [];
  public sumarry:any = null;

  options: Option[] = [];
  operators: UserInfomation[] = [];
  agencies: UserInfomation[] = [];  
  users:UserInfomation[] = [];  
  expanded_filter:boolean = false;

  // graph
  public result_play_void: any[];
  public result: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Role';
  public showYAxisLabel = true;
  public yAxisLabel = 'Amount (₦)';
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };


  // filters
  date_from:string;
  date_to:string;
  option: number = 0;
  operator: number = 0;
  agency: number = 0;
  user: number = 0;
  qbet:number = 0;
  betid:number = 0;
  events_min:number = 0;
  events_max:number = 0;
  type:string = '';
  amount_min:number = 0;
  payout_min:number = 0;
  view_from:number = 1;
  view_count:number = 100;
  state_void: boolean = false;
  state_in_progress: boolean = false;
  state_lost: boolean = false;
  state_won: boolean = false;

  

  constructor(public adminService: AdminBetService, 
    public adminBaseService: AdminService,
    public cachService: CacheService,
    public adminUserService: AdminUserService) 
  {
    this.date_from = this.cachService.getCurTime().toISOString().replace(/\..+/, '');
    this.date_to = this.date_from;

      let svc = this;
      this.adminBaseService.get_options(this.cachService.getToken()).then(res =>{
        if(res)
        {
          this.options = res;
        }
      });

      this.adminUserService.get_operators(this.cachService.getToken()).then(res=>{
        if(res!=null)
        {
          svc.operators = res;
        }
      });
  }

  on_change_operator()
  {
    this.adminUserService.get_agencis(this.cachService.getToken(), this.operator).then(res=>{
      if(res!=null)
      {
        this.agencies = res;
      }
    });    
  }

  on_change_agency()
  {
    this.adminUserService.get_users(this.cachService.getToken(), this.agency).then(res=>{
      if(res!=null)
      {
        this.users = res;
      }
    });    
  }  


  ngOnInit() {
  }

  get_user_permission()
  {
    let user = this.cachService.getUser();
    if(user==null) return null;
    return user.role;
  }  

  on_search()
  {
    let svc = this;

    let filter = {
      date_from:   this.date_from,
      date_to: this.date_to,
      option: this.option,
      operator: this.operator,
      agency: this.agency,
      user: this.user,
      qbet: this.qbet,
      betid: this.betid,
      events_min: this.events_min,
      events_max: this.events_max,
      type: this.type,
      amount_min: this.amount_min,
      payout_min: this.payout_min,
      view_from: this.view_from,
      view_count: this.view_count,
      state_void: this.state_void,
      state_in_progress: this.state_in_progress,
      state_lost: this.state_lost,
      state_won: this.state_won
    };

    this.adminService.get_bet_report(this.cachService.getToken(),filter).then(res =>{
      if(res)
      {
        svc.days = res.days;
        svc.sumarry = res.sumarry;

        this.result = [];
        this.result.push({name:'Played', value: Math.trunc(Number(svc.sumarry.total_amount))});
        this.result.push({name:'MaxWin', value: Math.trunc(Number(svc.sumarry.total_max_win))});
        this.result.push({name:'Void', value: Math.trunc(Number(svc.sumarry.total_void))});
        this.result.push({name:'Won', value: Math.trunc(Number(svc.sumarry.total_won))});
        this.result.push({name:'Net', value: Math.trunc(Number(svc.sumarry.total_net))});

        this.result_play_void = [];
        this.result_play_void.push({name: 'Played', value: svc.sumarry.total_bets_count});
        this.result_play_void.push({name: 'Void', value: svc.sumarry.total_voids_count});
      }      
    });    
  }

}
