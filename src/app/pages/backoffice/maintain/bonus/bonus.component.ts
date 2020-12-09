import { Component, ViewEncapsulation } from '@angular/core';
import { CacheService, AdminMaintainService } from 'src/app/core/service';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BonusComponent {
  public data = [];

  public settings = {
    selectMode: 'single',  //single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
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
      events: {
        title: 'Events',
        type: 'number',
        filter: false
      },
      percent: {
        title: 'Percentage',
        type: 'number',
        filter: false        
      },
      min_prize: {
        title: 'Minimum odds',
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
    
      this.adminMaintainService.bet_bonus(this.cachService.getToken()).then(res=>{
        this.data = res;
      });
  }

  public onDeleteConfirm(event): void {
    
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete?')
    .then((confirmed) => {
      if(confirmed)
      {
        this.adminMaintainService.delete_bet_bonus(this.cachService.getToken(), event.data.id).then(res =>{
          if(res)
          {
            this.toastrService.success("Removed successful", "Remove bonus");
            event.confirm.resolve();
          }
          else
          {
            this.toastrService.error(this.adminMaintainService._message, "Failed remove bonus");
            event.confirm.reject();
          }
        });
      }
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
    let events = Number(event.newData.events);
    if(events <=0)
    {
      event.confirm.reject();
      return;
    } 

    let exist = false;
    if(event.data.events != event.newData.events)
    {
      this.data.forEach(bonus =>{
        if(bonus.evetns == event.newData.events && bonus.id != event.data.id)
          exist = true;
      });
      if(exist)
      {
        this.toastrService.warning("already exist!", "Please choose other events count");
        event.confirm.reject();
        return;
      }    
    }

    let percent = Number(event.newData.percent);
    let min_prize = Number(event.newData.min_prize);

    let bonus = {
      id: event.newData.id,
      events: events,
      percent: percent,
      min_prize: min_prize
    };

    this.adminMaintainService.update_bet_bonus(this.cachService.getToken(), bonus).then(res=>
      {
        if(res)
        {
          this.toastrService.success("updated bonus", "Save");
          event.confirm.resolve();
        }
        else
        {
          this.toastrService.error(this.adminMaintainService._message, "Add new");
          event.confirm.reject();
        }
      });    

  }

  onCreateConfirm(event):void
  {
    let events = Number(event.newData.events);
    if(events <=0)
    {
      event.confirm.reject();
      return;
    } 

    let exist = false;
    this.data.forEach(bonus =>{
      if(bonus.evetns == event.newData.events)
        exist = true;
    });

    if(exist)
    {
      this.toastrService.warning("already exist!", "Please choose other events count");
      event.confirm.reject();
      return;
    }
    let percent = Number(event.newData.percent);
    let min_prize = Number(event.newData.min_prize);

    let bonus = {
      events: events,
      percent: percent,
      min_prize: min_prize
    };

    this.adminMaintainService.add_bet_bonus(this.cachService.getToken(), bonus).then(res=>
      {
        if(res >0)
        {
          this.toastrService.success("new bonus added", "Add new");
          event.confirm.resolve();
          setTimeout(()=>{
            this.data[0].id = res;
            let item = this.data[0];
            this.data.splice(0, 1);
            this.data.push(item);
          }, 1000);
        }
        else
        {
          this.toastrService.error(this.adminMaintainService._message, "Add new");
          event.confirm.reject();
        }
      });
  }

}
