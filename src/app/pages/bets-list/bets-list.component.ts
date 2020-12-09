import { Component, OnInit } from '@angular/core';
import { DataService, BetService, CacheService} from 'src/app/core/service';
import { Option } from 'src/app/core/model';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from 'src/app/core/GlobalVar';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit {
  public modalRef: NgbModalRef;

  public count:number = 100;
  public sport:number = 0;

  public summary:[] = null;  

  public bets:any[] = [];
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
      custom: [
        {
          name: 'print',
          title: '<i class="fa fa-print fa-lg mr-1 text-info" title="Print"><i>'
        }
      ],
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
      bet_id: {
        title: 'ID',
        width: '80px',
        type: 'html',
        filter: true,        
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      type: {
        title: 'Type',
        type: 'html',
        filter: true,
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      event_count: {
        title: 'Event',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      insert_at: {
        title: 'Date',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      amount: {
        title: 'Amount',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      max_win: {
        title: 'Max win',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      expire_at: {
        title: 'Date Expire',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }
      },
      bet_result: {
        title: 'Bet Result',
        type: 'html',
        valuePrepareFunction: (value) => { 
          if(value=='none')
            return '<i class="fa fa-spinner text-primary mr-1"></i>InProgress'; 
          else if(value=='won')
            return '<i class="fa fa-flag text-success mr-1"></i>Won'; 
          else if(value=='lost')
            return '<i class="fa fa-close text-danger mr-1"></i>Lost'; 
          return '';
        }
      },
      status:{
        title: 'Void',
        type: 'html',
        valuePrepareFunction: (value) => { 
          if(value == 2)
            return '<i class="fa fa-trash text-danger mr-1"></i>Void'; 
          return '';
        }
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

 

  constructor(public BetService: BetService, 
    public dataService: DataService,
    public toastrService: ToastrService,  
    public modalService: NgbModal,             
    public cachService: CacheService,
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

    this.BetService.get_bet_list(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        svc.summary = res.summary;
        svc.bets = res.bets;
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


  onCustomAction(event, ticketModalContent)
  {    
    switch(event.action)
    {
      case "print":
        let url = location.origin + "/ticket-view?betid=" + event.data.bet_id;
        window.open(url, '_blank', 'toolbar=0, width=400, height=500');
    
        // this.selected_bet = event.data;
        // this.selected_bet_results = JSON.parse(this.selected_bet.results);
    
        // let options: any = {
        //   size: "dialog-centered",
        // };
        // this.modalRef = this.modalService.open(ticketModalContent, options);  
        // GlobalVar.latestModal =  this.modalRef;
        // this.modalRef.result.then((result) => {
        // }, (reason) => {
        // });
        break;
    }
  }

  on_delete()
  {
    
  }

}
