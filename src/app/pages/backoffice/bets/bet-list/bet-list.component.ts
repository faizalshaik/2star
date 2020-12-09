import { Component, OnInit } from '@angular/core';
import { AdminService, AdminBetService, CacheService, AdminUserService } from 'src/app/core/service';
import { UserInfomation, Option } from 'src/app/core/model';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {

  public p:any;

  public count:number = 100;
  public sport:number = 0;
  public bets:any[] = [];
  public selected_bet = null;
  public selected_bet_results = null;

  options: Option[] = [];
  operators: UserInfomation[] = [];
  agencies: UserInfomation[] = [];  
  users:UserInfomation[] = [];  
  expanded_filter:boolean = false;


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

  

  constructor(public adminBetService: AdminBetService, 
    public adminBaseService: AdminService,
    public toastrService: ToastrService,    
    public cachService: CacheService,
    public confirmationDialogService:  ConfirmationDialogService,    
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

    this.adminBetService.get_bet_list(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        svc.bets = res;
      }      
    });    
  }

  on_select_bet(bet)
  {
    if(this.selected_bet == bet)
      this.selected_bet = null;
    else
    {
      this.selected_bet = bet;
      this.selected_bet_results = JSON.parse(this.selected_bet.results);
    }
  }

  on_void_bet(bet)
  {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this bet ?')
    .then((confirmed) => {
      if(confirmed)
      {
        this.adminBetService.void_bet(this.cachService.getToken(), bet.bet_id).then(res=>{
          if(res)
          {
            bet.status = 2;
            this.toastrService.success("Success", "Void bet");            
          }
          else
          {
            this.toastrService.error("Failed", "Void bet");
          }
        })
      }
    });
  }

}
