import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from 'src/app/core/GlobalVar';
import { BetService, CacheService, DatetimeService } from 'src/app/core/service';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html'
})

export class PrintTicketComponent implements OnInit{

  error:boolean = false;
  message:string ='';

  user;
  bet: any;
  bet_results: any[];
  bonus : number = 0;
  total_win : number = 0;
  status: string='';

  constructor(public datetimeService: DatetimeService, 
    public betService: BetService,
    private router: Router) { 

      // this.route.paramMap.subscribe(params => {
      //   let betid = params.get('id');
      //   console.log(betid);
      // });
  }
  ngOnInit() {
    let activatedRoute = this.router.routerState.snapshot.root;    
    let betid = activatedRoute.queryParams['betid'];
    this.betService.get_bet_for_print(Number(betid)).then(res=>{
      if(res)
      {
        this.user = res.user;
        this.bet = res.bet;
        this.bet_results = JSON.parse(res.bet.results);

        this.bonus = 0;
        if(this.bet.type=='Direct')
        {
          this.bonus = this.bet.bonus_percent * this.bet.max_win / 100;
        }

        if(this.bet.bet_result=='none')
        {
          this.total_win = Number(this.bet.max_win) + Number(this.bonus);
          this.status = "inProgress";
        }
        else if(this.bet.bet_result=='lost')
        {
          this.total_win = 0;
          this.status = "Lost";
        }
        else if(this.bet.bet_result=='won')
        {
          this.total_win = this.bet.total_win;
          this.status = "Won";
        }         
      
      }
      else
      {
        this.error = true;
        this.message = this.betService._message;
      }
    });
  }  

  ngAfterViewInit(){
    document.getElementById('preloader').classList.add('hide');
    window.print();
  }

}
