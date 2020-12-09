import { Component, OnInit } from '@angular/core';
import { AdminService, AdminBetService, CacheService, AdminUserService, AdminTransactionService } from 'src/app/core/service';
import { UserInfomation, Option } from 'src/app/core/model';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {

  public p:any;
  public transfers:any[] = [];
  summary:any;
  summary_date:any;

  operators: UserInfomation[] = [];
  agencies: UserInfomation[] = [];  
  users:UserInfomation[] = [];  
  expanded_filter:boolean = false;

  // filters
  date_from:string;
  date_to:string;
  
  operator: number = 0;
  agency: number = 0;
  user: number = 0;

  move_type:number = 0;
  commission_type:number = 0;
  username:string = '';
  amount_min:number = 0;
  amount_max:number = 0;

  view_from:number = 1;
  view_count:number = 100;

  state_transfers: boolean = false;
  state_admin: boolean = false;
  state_subnet: boolean = false;
  state_bydate: boolean = false;
  


  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
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
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      user: {
        title: 'User',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      payer: {
        title: 'Payer',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      receiver: {
        title: 'Receiver',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      descr: {
        title: 'Description',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      org_balance: {
        title: 'Initial Balance',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      given: {
        title: 'Given',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      received: {
        title: 'Received',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      new_balance: {
        title: 'Final Balance',
        type: 'html',
        valuePrepareFunction: (value) => { 
          return '<div class="text-center">₦ ' + value + '</div>';
        }
      }      
    },
    pager: {
      display: true,
      perPage: 10
    }
  };  

  constructor(
    public adminTransactionService: AdminTransactionService, 
    public toastrService: ToastrService,    
    public cachService: CacheService,
    public confirmationDialogService:  ConfirmationDialogService,    
    public adminUserService: AdminUserService) 
  {
      let week = this.cachService.getWeekInfo();
      this.date_from = week.from;
      this.date_to = week.to;

      let svc = this;
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
      // option: this.option,
      operator: this.operator,
      agency: this.agency,
      user: this.user,
      amount_min: this.amount_min,
      amount_max: this.amount_max,
      move_type: this.move_type,
      commission_type: this.commission_type,
      view_from: this.view_from,
      view_count: this.view_count,
      state_transfers: this.state_transfers,
      state_admin: this.state_admin,
      state_subnet: this.state_subnet
    };

    this.adminTransactionService.get_transfer_list(this.cachService.getToken(), filter).then(res=>{
      if(res)
      {
        this.transfers = res.transactions;
        this.summary = res.summary;
        this.summary_date = res.summary_date;
      }
    });
  }

}
