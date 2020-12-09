import { Component, OnInit } from '@angular/core';
import { AdminService, AdminDataService, CacheService } from 'src/app/core/service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-latest-result',
  templateUrl: './latest-result.component.html',
  styleUrls: ['./latest-result.component.scss']
})
export class LatestResultComponent implements OnInit {

  public p:any;
  public qbet:number = 0;
  public from:number = 1;
  public count:number = 100;
  public sport:number = 0;

  public events:any[] = [];
  selected_event: number = 0;
  
  sports:any[] = [];
  goals: any[]=[];
  cards: any[]=[];
  conners: any[]=[];

  constructor(public cachService: CacheService, 
    public toastrService: ToastrService,
    public adminDataService: AdminDataService) {

    this.adminDataService.get_sports(this.cachService.getToken()).then(res=>{
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
    if(this.sport == 0)
    {
      this.toastrService.info("select sport!", "Info");
      return;
    }

    let svc = this;
    let filter = {qbet: this.qbet, from: this.from, count: this.count, sport: this.sport};
    this.adminDataService.get_latest_result(this.cachService.getToken(), filter).then(res =>{
      if(res)
      {
        svc.events = res;
      }      
    });    
  }

  on_select_game(event){
    this.selected_event = event;
    this.goals = event.goals;
    this.cards = event.cards;
    this.conners = event.conners;
  }

}
