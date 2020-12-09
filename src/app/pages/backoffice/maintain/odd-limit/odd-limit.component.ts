import { Component, ViewEncapsulation } from '@angular/core';
import { CacheService, AdminMaintainService } from 'src/app/core/service';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-odd-limit',
  templateUrl: './odd-limit.component.html',
  encapsulation: ViewEncapsulation.None
})

export class OddLimitComponent {
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
      name: {
        title: 'Group',
        type: 'string',
        filter: false,
        editable: false,
      },
      max_odd: {
        title: 'Max Odd',
        type: 'number',
        filter: false        
      },
      odd_increase: {
        title: 'Increase',
        type: 'number',
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
    
      this.adminMaintainService.odd_limits(this.cachService.getToken()).then(res=>{
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
    let max_odd = Number(event.newData.max_odd);
    let odd_increase = Number(event.newData.odd_increase);
    if(max_odd < 0 || odd_increase <0)
    {
      event.confirm.reject();
      return;
    } 

    this.adminMaintainService.odd_limit_update(this.cachService.getToken(), event.newData.id, 
      max_odd, odd_increase).then(res=>
      {
        if(res)
        {
          this.toastrService.success("updated odd limit", "Save");          
          event.confirm.resolve();
        }
        else
        {
          this.toastrService.error(this.adminMaintainService._message, "Save");
          event.confirm.reject();
        }
      });    

  }

}
