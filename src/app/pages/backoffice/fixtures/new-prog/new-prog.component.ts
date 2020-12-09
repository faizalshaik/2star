import { Component, OnInit } from '@angular/core';
import { AdminService, AdminDataService, CacheService } from 'src/app/core/service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-new-prog',
  templateUrl: './new-prog.component.html',
  styleUrls: ['./new-prog.component.scss']
})

export class NewProgComponent implements OnInit {

  public modalRef: NgbModalRef;
  public form:FormGroup;

  selected_fixture:any;
  fixtures:any[]=[];
  valid_qbets:number[]=[];
    
  public p:any;

  public sports:any[]=[];
  sport_id:number = 0;

  public countries: any[]=[];
  country_key:number = 0;  

  public leagues1: any[]=[];  
  public leagues: any[]=[];
  league_key:number = 0;  

  new_league_name:string='';
  
  public group_options:any[] = [];
  public options:any[] = [];
  public option_groups:any[] = [];

  public selected_groups:number[] = [];

  progs: Prog[] = [];
  
  constructor(public cachService: CacheService, 
    public fb:FormBuilder, 
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,
    public modalService: NgbModal,    
    public adminService: AdminService, 
    public adminDataService: AdminDataService) {

    this.adminDataService.get_sports(this.cachService.getToken()).then(res=>{
      if(res)
        this.sports = res;
    })

    this.adminService.get_group_options(this.cachService.getToken()).then(res=>{
      if(res!=null)
      {
        this.group_options = res.group_options;
        this.options = res.options;
        this.option_groups = res.groups;
        for(let i=0; i<this.option_groups.length; i++)
        {
          if(this.option_groups[i].id == 1)
          {
            this.option_groups.splice(i, 1);
            break;
          }
        }
      }
    });

  }

  ngOnInit() {
    this.form = this.fb.group({
      country_key: [null, Validators.compose([Validators.required])],
      league_key: [null, Validators.compose([Validators.required])],
      qbet: [0, Validators.compose([Validators.required])],
    });  
  }

  is_selected_group(id)
  {
    for(let i=0; i<this.selected_groups.length; i++)
    {
      if(this.selected_groups[i]==id) return true;
    }
    return false;
  }
  on_select_option_group(id)
  {
    for(let i=0; i<this.selected_groups.length; i++)
    {
      if(this.selected_groups[i]==id) 
      {
        let opt_start_idx = 0;
        for(let j=0; j<i; j++)
        {
          opt_start_idx += this.get_options_count_of_group(this.selected_groups[j]);
        }
        let cur_group_opt_count = this.get_options_count_of_group(this.selected_groups[i]);        
        this.selected_groups.splice(i, 1);
        this.progs.forEach(prog => {
          prog.prizes.splice(opt_start_idx, cur_group_opt_count);
        });
        return;
      }
    }

    this.selected_groups.push(id);
    let optionCnt = this.get_options_count_of_group(id);
    this.progs.forEach(prog => {
      for(let i=0; i<optionCnt; i++)
        prog.prizes.push(1);
    });
  }

  refresh_custom_fixtures()
  {
    this.adminDataService.get_custom_fixtures(this.cachService.getToken(), this.sport_id).then(res=>{
      this.valid_qbets = [];
      if(res)
      {
        this.fixtures = res;
        for(let i =1; i<=100; i++)
        {
          let bExist = false;
          this.fixtures.forEach(fixture =>
            {
              if(fixture.qbet == i)
                bExist = true;
            });
          if(!bExist)
            this.valid_qbets.push(i);
        }        
      }
    });    
  }
  on_change_sport()
  {
    if(this.sport_id==0) {
      this.countries = [];
      this.country_key = 0;
      this.leagues = [];
      this.league_key = 0;
      this.fixtures = [];
      this.valid_qbets = [];
      return;
    }
    this.adminDataService.get_countries(this.cachService.getToken(), this.sport_id).then(res=>{
      if(res)
      {
        this.countries = res;
      }
    });
    this.refresh_custom_fixtures();
  }
  
  on_change_country()
  {
    if(this.country_key==0) {
      this.leagues = [];
      this.league_key = 0;
      return;
    }
    this.adminDataService.get_leagues(this.cachService.getToken(), this.sport_id, this.country_key).then(res=>{
      if(res)
      {
        this.leagues = res;
      }
    })
  }

  on_change_country1()
  {    
    if(this.form.value.country_key==null) {
      this.leagues1 = [];
      this.form.value.league_key = null;
      return;
    }
    this.adminDataService.get_leagues(this.cachService.getToken(), this.sport_id, this.form.value.country_key).then(res=>{
      if(res)
      {
        this.leagues1 = res;
      }
    })
  }

  public onSubmit():void {
    if (this.form.valid) {      
      let prog = new Prog();
      prog.qbet = this.form.value.qbet;
      prog.country_key = this.form.value.country_key;
      prog.league_key = this.form.value.league_key;
      prog.date_time = this.cachService.getCurTime().toISOString().replace(/\..+/, '');

      this.countries.forEach(cntry =>{
        if(cntry.key == prog.country_key)
          prog.country_name = cntry.name;
      })

      this.leagues1.forEach(lg =>{
        if(lg.key == prog.league_key)
          prog.league_name = lg.name;
      })

      let opts = this.get_selected_options();
      for(let i=0; i<opts.length; i++)
        prog.prizes.push(1);
      this.progs.push(prog);
      this.modalRef.close();
      
      for(let i=0; i<this.valid_qbets.length; i++)
      {
        if(this.valid_qbets[i] == prog.qbet)
        {
          this.valid_qbets.splice(i, 1);
          break;
        }
      }
    }
  } 


  on_create_new_league()
  {
    if(this.sport_id==0 || this.country_key==0 || this.new_league_name=='')
      return;
    this.adminDataService.create_league(this.cachService.getToken(), this.sport_id, this.country_key, this.new_league_name).then(res=>{
      if(res)
      {
        let lg = {id: res.id, key: res.key, name:this.new_league_name};
        this.leagues.push(lg);
        this.league_key = lg.key;
        this.toastrService.success('Success', 'new league created');
      }
      else
      {
        this.toastrService.error('Failed', this.adminDataService._message);
      }
    })
    
  }

  get_selected_options()
  {
    let options = [];
    this.selected_groups.forEach(grp =>{
      this.group_options.forEach(grp_op =>{
        if(grp == grp_op.group_id)
          options.push(grp_op.option_id)
      })
    });
    return options;
  }

  get_options_count_of_group(grp_id)
  {
    let count = 0;
    this.group_options.forEach(grp_op =>{
      if(grp_id == grp_op.group_id)
        count++;
    })
    return count;
  }
  get_group_name(grp_id)
  {
    for(let i=0; i<this.option_groups.length; i++)
    {
      if(this.option_groups[i].id == grp_id)
        return this.option_groups[i].name;
    }
    return '';
  }  

  get_option_name(opt_id)
  {
    for(let i=0; i<this.options.length; i++)
    {
      if(this.options[i].id == opt_id)
        return this.options[i].name;
    }
    return '';
  }

  on_remove_prog()
  {
    if(this.progs.length <= 0) return;
    this.progs.splice(this.progs.length -1, 1);
  }
  on_add_prog(modalContent)
  {
    if(this.sport_id==0)
    {
      this.toastrService.info("Please select sport", "Info");
      return;
    }

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

  public closeModal(){
    this.modalRef.close();
  }

  on_create_progs()
  {
    if(this.sport_id==0)
    {
      this.toastrService.error('Info', "Please select league");
      return;
    }
    if(this.selected_groups.length==0)
    {
      this.toastrService.error('Info', "Please select option groups");      
      return;
    }
    for(let i=0; i<this.progs.length; i++)
    {
      if(this.progs[i].home_team=='' || this.progs[i].away_team=='' )
      {
        this.toastrService.error('Info', "Please input home/away team name");
        return;
      }
    }    

    let opts = this.get_selected_options();
    this.adminDataService.create_programs(this.cachService.getToken(),
      this.sport_id, this.progs, opts).then(res=>
      {
        if(res)
        {
          this.toastrService.success('New progs', "creted successfully");
          this.selected_groups = [];
          this.progs = [];
          this.refresh_custom_fixtures();
        }
        else
        {
          this.toastrService.success('Error', this.adminDataService._message);
        }
      });    
  }

  on_remove_match(ev)
  {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this match ?')
    .then((confirmed) => {
      if(confirmed)
      {
        this.adminDataService.remove_custom_fixture(this.cachService.getToken(), this.sport_id, ev.qbet, ev.date).then(res=>{
          if(res)
          {
            this.toastrService.success("Success", "Remove fixture");
            this.refresh_custom_fixtures();
          }
          else
          {
            this.toastrService.error(this.adminDataService._message, "Failed remove fixture");
          }
        })
      }
    });
  }

  on_expand_odds(ev)
  {
    if(ev == this.selected_fixture)
    {
      this.selected_fixture = null;
    }
    else
    {
      let odds = JSON.parse(ev.odds);
      this.options.forEach(opt =>{
        if(odds==null)
          opt.value = 0;
        else
          opt.value = odds[opt.key];
      })
      this.selected_fixture = ev;
    }
  }  

  on_save_match(ev)
  {    
    let odds = {};
    this.options.forEach(op =>{
      odds[op.key] = op.value;
    })

    let prize = {
      qbet: ev.qbet,
      date: ev.date,
      odds: odds
    }
    this.adminDataService.update_prize(this.cachService.getToken(), this.sport_id, prize).then(res=>{
      if(res)
      {
        ev.odds = res;
        ev.updated = false;
      }
    });
  }



}

export class Prog{
  qbet: number = 0;
  home_team:string='';
  away_team:string='';
  date_time:string='';
  country_key:number = 0;
  country_name:string = '';  
  league_key:number = 0;
  league_name:string = '';    
  prizes: number []= [];
}
