import { Component, OnInit } from '@angular/core';
import { DataService, BetService, CacheService, TransactionService} from 'src/app/core/service';
import { Option } from 'src/app/core/model';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from 'src/app/core/GlobalVar';

@Component({
  selector: 'app-transfers-list',
  templateUrl: './transfers-list.component.html',
  styleUrls: ['./transfers-list.component.scss']
})
export class TransfersListComponent implements OnInit {

 
  show_dete_summary:boolean = false;
  type:string='all';

  public summary:any;  
  public summary_date:any;    
  public transactions:any[] = [];


  // filters
  date_from:string;
  date_to:string;
  view_from:number =1;
  view_count:number =100;


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
      id: {
        title: 'ID',
        width: '80px',
        type: 'html',
        filter: true,        
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }       
      },
      date: {
        title: 'Date',
        type: 'html',
        filter: true,
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      type: {
        title: 'Type',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
      },
      descr: {
        title: 'Description',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }        
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
      org_balance: {
        title: 'Original Balance',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">₦ ' + value + '</div>'; }
      },
      new_balance: {
        title: 'Balance',
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

  constructor(public BetService: BetService, 
    public transactionService: TransactionService,
    public dataService: DataService,
    public toastrService: ToastrService,  
    public modalService: NgbModal,             
    public cachService: CacheService,
    // public confirmationDialogService:  ConfirmationDialogService
    ) 
  {
    this.date_from = this.cachService.getCurTime().toISOString().replace(/\..+/, '');
    this.date_to = this.date_from;

  }

  ngOnInit() {
  }

  on_search()
  {
    let svc = this;

    let filter = {
      date_from:   this.date_from,
      date_to: this.date_to,
      type: this.type,
      view_from: this.view_from,
      view_count: this.view_count,
    };

    this.date_from = this.cachService.getCurTime().toISOString().replace(/\..+/, '');
    this.date_to = this.date_from;
    this.transactionService.get_transactions(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        this.summary = res.summary;
        this.summary_date = res.summary_date;
        this.transactions = res.transactions;
      }
    });
  }


}
