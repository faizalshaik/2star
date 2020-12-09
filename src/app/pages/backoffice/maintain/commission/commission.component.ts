import { Component, ViewEncapsulation } from '@angular/core';
import { CacheService, AdminMaintainService } from 'src/app/core/service';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  encapsulation: ViewEncapsulation.None
})

export class CommissionComponent {
  public data = [];

  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: true,
      delete: false,
      custom: [],
      position: 'right' // left|right
    },
    add: {     
      addButtonContent: '<h4 class="mb-1"><i class="fa fa-plus ml-3 text-success"></i></h4>',
      createButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil mr-3 text-primary"></i>',
      saveButtonContent: '<i class="fa fa-check mr-3 text-success"></i>',
      cancelButtonContent: '<i class="fa fa-times text-danger"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-o text-danger"></i>',
      confirmDelete: true
    },
    noDataMessage: 'No data found',
    columns: {     
      id: {
        title: 'ID',
        editable: false,
        width: '60px',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + value + '</div>'; }
      },
      under: {
        title: 'Under',
        editable: false,
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="text-center">' + 'Under' + value + '</div>'; }
      },
      commission: {
        title: 'Commission(%)',
        type: 'number',
        filter: false        
      },
      max_stake: {
        title: 'Max Stake',
        type: 'number',
        filter: false        
      },
      status: {
        title: 'Status',
        type: 'boolean',
        filter: false        
      }
    },
    pager: {
      display: true,
      perPage: 10
    }
  };

  constructor(
    public cachService: CacheService, 
    public adminMaintainService: AdminMaintainService,
    public confirmationDialogService:  ConfirmationDialogService,    
    public toastrService: ToastrService) { 
    
      this.adminMaintainService.commissions(this.cachService.getToken()).then(res=>{
        this.data = res;
      });
  }



  public onRowSelect(event){
   // console.log(event);
  }

  public onUserRowSelect(event){
    //console.log(event);   //this select return only one page rows
  }

  public onRowHover(event){
    //console.log(event);
  }

  onSaveConfirm(event):void
  {
    let commission = Number(event.newData.commission);
    let max_stake = Number(event.newData.max_stake);
    let status = Boolean(event.newData.status);
    if(max_stake < 0 || commission <0)
    {
      event.confirm.reject();
      return;
    } 

    this.adminMaintainService.commission_update(this.cachService.getToken(), event.newData.id, 
      commission, max_stake, status).then(res=>
      {
        if(res)
        {
          this.toastrService.success("updated odd limit", "Save");          
          event.confirm.resolve();
        }
        else
        {
          this.toastrService.error(this.adminMaintainService._message, "Add new");
          event.confirm.reject();
        }
      });    

  }

}
