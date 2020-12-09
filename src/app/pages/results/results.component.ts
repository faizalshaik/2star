import { Component, OnInit } from '@angular/core';
import { DataService, BetService, CacheService, DatetimeService} from 'src/app/core/service';
import { Option } from 'src/app/core/model';
import { GlobalVar } from 'src/app/core/GlobalVar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public p:any;

  public events:any[] = [];
  public selected_event = null;

  sports: any[] = [];

  // filters
  date_from:string;
  date_to:string;
  public sport:number = 0;    
  qbet:number = 0;
  view_from:number = 1;
  view_count:number = 100;
  
 

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
      this.dataService.get_sports(this.cachService.getToken()).then(res =>{
        if(res)
        {
          this.sports = res;
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
      sport: this.sport,
      qbet: this.qbet,      
      view_from: this.view_from,
      view_count: this.view_count,
    };

    this.betService.get_results(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        svc.events = res;
      }      
    });    
  }

  on_select_event(event)
  {
    if(event == this.selected_event)
    {
      this.selected_event = null;      
    }
    else
    {
      this.selected_event = event;
    }
  }

}
