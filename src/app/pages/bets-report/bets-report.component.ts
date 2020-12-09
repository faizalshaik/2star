import { Component, OnInit } from '@angular/core';
import { DataService, BetService, CacheService, DatetimeService} from 'src/app/core/service';
import { Option } from 'src/app/core/model';
import { GlobalVar } from 'src/app/core/GlobalVar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bets-report',
  templateUrl: './bets-report.component.html',
  styleUrls: ['./bets-report.component.scss']
})
export class BetsReportComponent implements OnInit {
  public modalRef: NgbModalRef;

  public count:number = 100;
  public sport:number = 0;

  public summary:[] = null;  

  public days:any[] = [];
  public selected_bet = null;
  public selected_bet_results = null;

  options: Option[] = [];
  expanded_filter:boolean = false;

  // filters
  date_from:string;
  date_to:string;
  
  option: number = 0;
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


  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'right' // left|right
    },
    add: {     
      addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
      createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
      saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {     
      date: {
        title: 'Date',
        type: 'html',
        filter: true,        
        valuePrepareFunction: (value) => { 
          return '<div class="text-center">' + 
            this.datetimeService.format_date(value) + ',' + this.datetimeService.format_weekday(value) + '</div>'; 
        }       
      },
      bets: {
        title: 'Number of bets',
        type: 'html',
        filter: true,
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      t_amount: {
        title: 'Total played',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }        
      },
      t_max_win_inprogress: {
        title: 'Max winnings InProgress',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }        
      },
      t_void: {
        title: 'Void',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      t_won: {
        title: 'Total won',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      t_net: {
        title: 'Net',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

 

  constructor(public betService: BetService, 
    public dataService: DataService,
    public toastrService: ToastrService,  
    public modalService: NgbModal,             
    public cachService: CacheService,
    public datetimeService: DatetimeService
    // public confirmationDialogService:  ConfirmationDialogService
    ) 
  {
      this.date_from = this.cachService.getCurTime().toISOString().replace(/\..+/, '');
      this.date_to = this.date_from;
      this.dataService.get_options(this.cachService.getToken()).then(res =>{
        if(res)
        {
          this.options = res;
        }
      });
  }

  ngOnInit() {
  }

  on_search()
  {
    let svc = this;

    let filter = {
      date_from:   this.date_from,
      date_to: this.date_to,
      option: this.option,
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

    this.betService.get_bet_report(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        svc.summary = res.summary;
        svc.days = res.days;
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

  on_delete()
  {
    
  }


}
