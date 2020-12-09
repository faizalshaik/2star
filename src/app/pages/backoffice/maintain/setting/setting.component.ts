import { Component, OnInit } from '@angular/core';
import { AdminService, AdminDataService, CacheService, DataService, AdminMaintainService } from 'src/app/core/service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {

  cur_changed:boolean = false;
  next_changed:boolean = false;
  next1_changed:boolean = false;    


  void_bet:number = 168;
  max_stake: number = 0;
  max_won: number = 0;  
  min_events_per_ticket: number = 0;
  max_events_per_ticket: number = 0;
  min_total_odd:number =0;
  max_total_odd:number = 0;

  weeks:any = null;
  settings: any=null;

  constructor(public cachService: CacheService, 
    public modalService: NgbModal,        
    public adminMaintainService: AdminMaintainService,
    public confirmationDialogService:  ConfirmationDialogService,    
    public toastrService: ToastrService) {

      this.refresh_setting();
      this.refresh_week();   
  }

  refresh_week()
  {
    this.adminMaintainService.weeks_for_display(this.cachService.getToken()).then(res=>
      {
       this.weeks = res; 
      });    
  }

  refresh_setting()
  {
    this.adminMaintainService.settings(this.cachService.getToken()).then(res=>
      {
       this.settings = res;
       this.max_stake = this.settings.max_stake;
       this.min_events_per_ticket = this.settings.min_events_per_ticket;
       this.max_events_per_ticket = this.settings.max_events_per_ticket;
       this.min_total_odd = this.settings.min_total_odd;
       this.max_total_odd = this.settings.max_total_odd;
       this.max_won = this.settings.max_won;
       this.void_bet = this.settings.void_bet;
      });    
  }  

  ngOnInit() {
  }

  on_save_settings()
  {
    this.settings.min_events_per_ticket = this.min_events_per_ticket;
    this.settings.max_events_per_ticket = this.max_events_per_ticket;
    this.settings.min_total_odd = this.min_total_odd;
    this.settings.max_total_odd = this.max_total_odd;

    this.settings.max_stake = this.max_stake;    
    this.settings.max_won = this.max_won;
    this.settings.void_bet = this.void_bet;
      this.adminMaintainService.save_settings(this.cachService.getToken(), this.settings).then(res=>{
          if(res)
          {
            this.toastrService.success("Stored successfuly", "Save Setting");
          }
          else
          {
            this.toastrService.error(this.adminMaintainService._message, "Failed Save Setting");
          }
        });
  }

  on_save_week(iweek, week)
  {
    this.adminMaintainService.save_week(this.cachService.getToken(), week).then(res =>{
      if(res)
      {
        this.toastrService.success("Changed Successfuly", "Save week!");
        if(iweek==0)
          this.cur_changed = false;
        else if(iweek==1)
          this.next_changed = false;
        else if(iweek==2)
          this.next1_changed = false;
      }
      else
      {
        this.toastrService.error(this.adminMaintainService._message, "Save week!");
      }
    })
  }

}
