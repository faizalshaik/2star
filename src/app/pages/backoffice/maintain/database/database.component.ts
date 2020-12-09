import { Component, OnInit } from '@angular/core';
import { AdminService, AdminDataService, CacheService, DataService, AdminMaintainService } from 'src/app/core/service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})

export class DataBaseComponent implements OnInit {

  sports_fixture_counts: any[];
  bet_count: any[];

  public modalRef: NgbModalRef;
  cleaning_fixtures: boolean = true;

  public form:FormGroup;

  constructor(public cachService: CacheService, 
    public fb:FormBuilder, 
    public modalService: NgbModal,        
    public adminMaintainService: AdminMaintainService,
    public confirmationDialogService:  ConfirmationDialogService,    
    public toastrService: ToastrService,
    public adminDataService: AdminDataService) {

      this.refresh_fixture_status();
      this.refresh_bets_status();
  }

  refresh_fixture_status()
  {
    this.adminMaintainService.get_fixtures_count(this.cachService.getToken()).then(res=>{
      if(res)
      {
        this.sports_fixture_counts = res;
      }
    });
  }
  refresh_bets_status()
  {
    this.adminMaintainService.get_bets_count(this.cachService.getToken()).then(res=>{
      if(res)
      {
        this.bet_count = res;
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      date: ''
    });  
  }


  on_clear_fixtures(sport_id, modalContent)  
  {
    this.cleaning_fixtures = true;

    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    let value = {
      id: sport_id,
      date: d.toISOString().replace(/\..+/, '')
    };
    this.form.setValue(value);

    let dlg_options: any = {
      size: "dialog-centered"
      };    
    this.modalRef = this.modalService.open(modalContent, dlg_options);
    
    this.modalRef.result.then((result) => {
      this.form.reset();  
    }, (reason) => {
      this.form.reset();
    });    
  }

  on_clear_bets(modalContent)
  {
    this.cleaning_fixtures = false;
    
    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    let value = {
      id: 0,
      date: d.toISOString().replace(/\..+/, '')
    };
    this.form.setValue(value);

    let dlg_options: any = {
      size: "dialog-centered"
      };    
    this.modalRef = this.modalService.open(modalContent, dlg_options);
    
    this.modalRef.result.then((result) => {
      this.form.reset();  
    }, (reason) => {
      this.form.reset();
    });    
  }


  public onSubmit():void 
  {
    let sport = '';
    this.sports_fixture_counts.forEach(cnt =>{
      if(cnt.id == this.form.value.id)
      {
        sport = cnt.name;
      }
    })

    if(this.cleaning_fixtures)
    {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + sport + ' fixtures from' + this.form.value.date + ' ?')
      .then((confirmed) => {
        if(confirmed)
        {
          this.adminMaintainService.clear_fixtures(this.cachService.getToken(), 
            this.form.value.id, this.form.value.date).then(res =>{
              this.toastrService.success("Cleaned successfuly", "Clean fixtures");
              this.refresh_fixture_status();
          });
        }
      });  
    }
    else
    {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + sport + ' bets from' + this.form.value.date + ' ?')
      .then((confirmed) => {
        if(confirmed)
        {
          this.adminMaintainService.clear_bets(this.cachService.getToken(), this.form.value.date).then(res =>{
              this.toastrService.success("Cleaned successfuly", "Clean bets");
              this.refresh_bets_status();
          });
        }
      });  
    }
  } 

  public closeModal(){
    this.modalRef.close();
  }

}
