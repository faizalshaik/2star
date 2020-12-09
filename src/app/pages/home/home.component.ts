import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { DataService, PrintService, CalcService, BetService, AuthService, CacheService } from '../../core/service';
import {FootBallFixture, LeagueData, DayEvents, OptionGroup, OptionGroupSelecting, Option, EventEntry, GameData, alert_data, UserInfo, SportData, GameMenu} from '../../core/model'
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { IMultiSelectSettings, IMultiSelectOption, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { CustomValidators } from 'ng2-validation';
import { BookService } from 'src/app/core/service/book.service';
import { ToastrService } from 'ngx-toastr';
import { DatetimeService } from 'src/app/core/service/datetime.service';
import { GlobalVar } from 'src/app/core/GlobalVar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  @ViewChild('quick_qbet', null) quick_qbet_ele: ElementRef;
  @ViewChild('quick_option_id', null) quick_option_id_ele: ElementRef;  
  @ViewChild('quick_play_game', null) quick_play_game_ele: ElementRef;    
  



  is_mobile_mode:boolean = false;
  

  is_quick_bet = false;
  days = 'today';
  focused_leagues :LeagueData[] = [];
  focused_league_opt_group_sels: OptionGroupSelecting[] = [];
  normal_selected_event: EventEntry = null;
  
  settings  = {
    max_stake: 100000,
    min_events_per_ticket: 2,
    max_events_per_ticket: 30,
    min_total_odd: 10,
    max_total_odd: 100,
    void_bet: 168
  };

  bonuses:any[]=[];
  sports: any[] = [];

  options: Option[] = [];
  quick_option_groups: OptionGroup[] = [];
  option_groups: OptionGroup[] = [];
  option_to_group = {};
  main_option_group: OptionGroup = null;  

  // upcoming
  upcoming_event_count:number = 5;
  upcoming_events: DayEvents[] = [];
  upcoming_opt_group_sel:OptionGroupSelecting = new OptionGroupSelecting();

  // most played
  mostplayed_event_count:number = 5;  
  mostplayed_events: DayEvents[] = [];
  mostplayed_opt_group_sel:OptionGroupSelecting = new OptionGroupSelecting();


  // quick  
  sportDatas: SportData[] = [
  ];
  quick_sport_id: number = 0;
  quick_countries = [];
  quick_events = [];
  sports_menu = [];  
  //   


  // odds
  loadingIndicator: boolean = false;
  reorderable: boolean = true;    
  odd_rows = [];
  selected = [];

  public menuItems:Array<any> = [];  
  public searchText: string;
  public p:any;
  public events:any[] = [];


  // print odds
  public modalRef: NgbModalRef;
  public printOddForm:FormGroup;

  public print_day = 'today';
  public print_sport_model: number[] = [];
  public print_sport_setting: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'checkboxes',
      buttonClasses: 'btn btn-warning btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
  };
  public print_sports: IMultiSelectOption[] = [ ];
  public print_sport_texts: IMultiSelectTexts = {
    checkAll: 'Select all sports',
    uncheckAll: 'Unselect all sports',
    checked: 'sport selected',
    checkedPlural: 'sports selected',
    searchPlaceholder: 'Find...',
    defaultTitle: 'Select sports using search filter',
    allSelected: 'All selected',
  };  

  public print_opt_group_model: number[] = [];
  public print_opt_groups: IMultiSelectOption[] = [ ];
  public print_opt_group_texts: IMultiSelectTexts = {
    checkAll: 'Select all groups',
    uncheckAll: 'Unselect all groups',
    checked: 'group selected',
    checkedPlural: 'groups selected',
    searchPlaceholder: 'Find...',
    defaultTitle: 'Select groups using search filter',
    allSelected: 'All selected',
  };  

  selected_option_id:number= 0;
  selected_event: EventEntry = null;
  selected_event_id: number = 0;
  selected_event_title:string= "";
  odds:string = '';
  bonus_percent:number = 0;
  game_datas: GameData[]= [];
  selected_odd_val:number = 1.50;
  betting_amount :number = 100;
  betting_win_direct: number = 0;  
  betting_win_permutation: number = 0;
  betting_apl_direct: number = 0;  
  betting_apl_permutation: number = 0;
  betting_tot_win_direct: number = 0;  
  betting_tot_win_permutation: number = 0;
  betting_gain_direct: number = 0;  
  betting_gain_permutation: number = 0;
  betting_bonus_direct: number = 0;  
  
  betting_mode: string="direct"; //permutation
  betting_under: number = 1;
  book_id: number = 0;

  last_bet:any = null;
  last_bet_results:any;
  bet_id: number = 0;
  info_alert:alert_data = null;
  warning_alert:alert_data = null;
  error_alert:alert_data = null;

  last_action_time = new Date();
  latest_matches: any[]=[];
  latest_matche: any=null;
  latest_matches_count:number = 5;
  


  constructor(public fb: FormBuilder, 
              public datetimeService: DatetimeService,
              public modalService: NgbModal,       
              public toastrService: ToastrService,    
              public cacheService:CacheService,
              public printService: PrintService,
              public calcService: CalcService, 
              public betService: BetService,
              public bookService: BookService,
              public dataService: DataService) { 
 

    let svc = this;
    this.dataService.get_base_infos().then(res =>{
      svc.cacheService.setTimeInfo(res.localtime, res.servertime, res.timezone);
      svc.cacheService.setWeekInfo(res.current_week);
      svc.bonuses = res.bonuses;
      svc.option_groups = res.option_groups;
      svc.options = res.options;      
      svc.sports = res.sports;
      svc.settings = res.settings;

      // update main option group
      svc.quick_option_groups = [];
      svc.print_opt_groups = [];
      svc.option_groups.forEach(grp => {
        if(grp.id == 1)
        {
          svc.main_option_group = grp;
        }
        else
        {
          svc.quick_option_groups.push(grp);
          svc.print_opt_groups.push({id: grp.id, name:grp.name});

          grp.options.forEach(opt =>{
            svc.option_to_group[opt.id] = grp;
          })
        }        
      });
      svc.on_select_option_group(svc.upcoming_events, svc.upcoming_opt_group_sel, svc.main_option_group);
      svc.on_select_option_group(svc.mostplayed_events, svc.mostplayed_opt_group_sel, svc.main_option_group);
    });

    
    this.updateAllDatas();
    setInterval(()=>{
      this.updateAllDatas();
    }, 300000);
  }

  update_last_action_time()
  {
    this.last_action_time = new Date();
  }


  openMenuAssign(event)
  {
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }

  ngOnInit() {
    this.printOddForm = this.fb.group({
    });
  }

  OnSelectMatch(matchId)
  {
    let svc = this;
    this.loadingIndicator = true;
    this.dataService.get_odds('', 'football', matchId).then(res=>{
      if(res==null)
      {
      }else{
        // make menu items
        svc.odd_rows = res;
        console.log(res);
      }
      this.loadingIndicator = false;
    });
  }

  on_quick_sport_selected(sport_id)
  {    
    this.quick_countries = [];
    this.quick_events = [];
    for(let i=0; i<this.sportDatas.length; i++)
    {
      if(this.sportDatas[i].id == sport_id)
      {
        this.quick_countries = this.sportDatas[i].countries;
        break;
      }
    }
    this.quick_sport_id = sport_id;
  } 


  on_quick_league_selected(league_id)
  {
    this.quick_events = [];
    let svc = this;

    let sports = [{sport: this.quick_sport_id, leagues: [league_id]}];
    this.dataService.get_leagues_events('', sports, this.days ).then(res =>{
      svc.quick_events = [];
      if(res.length > 0 && res[0].days.length > 0)
      {
        svc.quick_events = res[0].days[0].events
      }
    })
  }



  update_leagues_data()
  {
    let sport_leagues = [];
    this.sports_menu.forEach(menu =>{
      let league_keys = [];      
      menu.countries.forEach(country => {
        country.leagues.forEach(league => {
          if(league.checked) 
            league_keys.push(league.id);
        });
      });
      if(league_keys.length > 0)
        sport_leagues.push({sport: menu.id, leagues: league_keys});
    })    

    if(sport_leagues.length==0)
    {
      this.focused_leagues = [];
      this.focused_league_opt_group_sels = [];
    }
    else
    {
      let svc = this;
      this.dataService.get_leagues_events('', sport_leagues, this.days ).then(res =>{

        svc.focused_league_opt_group_sels = [];
        for(let i=0; i<res.length; i++)
        {
          let grp_sel = new OptionGroupSelecting();
          grp_sel.id = svc.main_option_group.id;
          grp_sel.name = svc.main_option_group.name;
          grp_sel.options = svc.main_option_group.options;
          svc.focused_league_opt_group_sels.push(grp_sel);
        }
        svc.focused_leagues = res;
        for(let i=0; i<svc.focused_leagues.length; i++)
          svc.on_select_option_group(svc.focused_leagues[i].days, svc.focused_league_opt_group_sels[i], svc.main_option_group);
      })
    }
  }


  checkedCountry(checked, icountry)
  {
    this.sports_menu[0].countries[icountry].checked = checked;
    for(let i=0 ;i<this.sports_menu[0].countries[icountry].leagues.length; i++)
      this.sports_menu[0].countries[icountry].leagues[i].checked = checked; 
      
    this.update_leagues_data();
  }  
  checkedLeague(checked, icountry, ileague)
  {
    console.log(checked);
    console.log(icountry + '-' + ileague);
    this.sports_menu[0].countries[icountry].leagues[ileague].checked = checked;

    let bexistone = false;
    for(let i=0 ;i<this.sports_menu[0].countries[icountry].leagues.length; i++)
    {
      if(this.sports_menu[0].countries[icountry].leagues[i].checked)
      {
        bexistone = true; break;
      }
    }
    this.sports_menu[0].countries[icountry].checked = bexistone;
    this.update_leagues_data();
  }


  on_change_upcoming_event_count()
  {
    let svc = this;
    this.dataService.get_upcoming_events('', 'football', this.upcoming_event_count).then(res => {
      if(res)
      {
        svc.upcoming_events = res;
      }
    });
  }
  on_change_most_played_event_count()
  {
    
  }

  is_played(event, option_id)
  {
    let bRet = false;
    this.game_datas.forEach(game =>{
      if(game.sport == event.sport_id && game.qbet == event.qbet && game.event_date==event.date && game.option_id == option_id)
        bRet = true;
    })
    return bRet;
  }

  get_option_value(event:EventEntry, option:Option)
  {
    let value = event.odds[option.key];
    if(value==null)
      return null;

    let group = this.option_to_group[option.id];
    if(group==null)
      return null;

    value = Number(value);      
    if(Number(group.odd_increase) > 0)
      value += Number(group.odd_increase);

    if(Number(group.max_odd) > 0 && value > Number(group.max_odd))
      return Number(group.max_odd);

    return value;
  }

  get_valid_options_count(event:EventEntry)
  {
    let cnt = 0;
    this.options.forEach(opt =>{
      if(this.get_option_value(event, opt))
        cnt++;      
    });
    return cnt;
  }

  on_show_more_options(event:EventEntry, modalContent)
  {
    this.normal_selected_event = event;
    let options: any = {
      size: "dialog-centered",
      // container: '.app'
    };
    this.modalRef = this.modalService.open(modalContent, options);    
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  get_valid_options_countin_group(event:EventEntry, grp:OptionGroup)
  {
    let cnt = 0;
    grp.options.forEach(opt =>{
      if(this.get_option_value(event, opt))
        cnt++;      
    });
    return cnt;
  }  



  on_select_option_group(dayEvents: DayEvents[], sel:OptionGroupSelecting, grp:OptionGroup)
  {
    sel.id = grp.id;
    sel.name = grp.name;
    sel.options = grp.options;
  }


  refresh_leagues()
  {
    let svc = this;
    this.dataService.get_leagues('', this.days).then(sports=>{
      svc.sports_menu = [];
      svc.print_sports = [];

      if(sports==null)
      {
      }else{
        svc.sportDatas = sports;

        svc.sportDatas.forEach(sport=>{
          let res = sport.countries;
          let countries = [];
          // make menu items
          svc.menuItems = [];
          for(let i =0; i<res.length; i++)
          {
            let countryid = sport.id * 1000000 + res[i].id;
            let menu = new GameMenu (countryid, res[i].name , null, null, res[i].logo, null, res[i].leagues.length > 0, res[i].leagues.length , 0, 0, sport.id);
            svc.menuItems.push(menu);
  
            let leagues = [];
            for(let j=0; j<res[i].leagues.length; j++ )
            {
              let lg = res[i].leagues[j];
              menu = new GameMenu (countryid + lg.id, lg.name , '/', null, lg.logo, null, false , 0, countryid, lg.id, sport.id);
              svc.menuItems.push(menu);
  
              leagues.push({name: lg.name, 
                          id: lg.id, 
                          sport_id: sport.id,
                          logo: lg.logo,
                          check_id: sport.key + '_league' + lg.id + 'chk',
                          checked: false})
            }
  
            countries.push({
              name: res[i].name, 
              logo: res[i].logo, 
              id: countryid, 
              head_id: sport.key + '_country' + res[i].id + 'heading', 
              body_id: sport.key + '_country' + res[i].id + 'body', 
              check_id: sport.key + '_country' + res[i].id + 'chk', 
              body_id_ref: '#' + sport.key + '_country' + res[i].id + 'body', 
              leagues: leagues, 
              checked: false,
              league_count: leagues.length}
            )
          }
          svc.sports_menu.push({
              id: sport.id, name: sport.name, 
              key: sport.key,
              head_id: sport.key + '-heading', body_id: sport.key + '-body', 
              body_id_ref: '#' + sport.key + '-body', countries: countries});

          svc.print_sports.push({id: sport.id, name:sport.name});
        });
      }
    });     
  }


  refresh_latest_matches()
  {
    this.dataService.get_latest_matches(this.cacheService.getToken(), 1, this.latest_matches_count).then(res=>{
      if(res)
        this.latest_matches = res;
    });
  }

  on_select_day(day:string)
  {
    this.days = day;
    this.refresh_leagues();
  }


  on_open_print_odds_modal(modalContent)
  {
    let options: any = {
      size: "dialog-centered",
      // container: '.app'
    };
    this.modalRef = this.modalService.open(modalContent, options);    
    this.modalRef.result.then((result) => {
      this.printOddForm.reset();
    }, (reason) => {
      this.printOddForm.reset();
    });
  }
  on_close_print_odds_modal()
  {
    this.modalRef.close();
  }  

  print_property(sports, option_groups) {

    let contents ='';
    sports.forEach(sport => {
      contents += this.printService.make_odd_table(sport.sport, option_groups, sport.leagues);
    });
    let breakCss = '@media all {.page-break { display: none; }}\n@media print {.page-break { display: block; page-break-before: always; }}\n'

    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.contentDocument.write('<html><head><title>' + document.title + '</title>');
    iframe.contentDocument.write('</head><style>');
    iframe.contentDocument.write(breakCss + this.stylesheet_html());
    iframe.contentDocument.write('</style><body>');
    iframe.contentDocument.write(contents);
    iframe.contentDocument.write('</body></html>');
    iframe.contentDocument.close();
    iframe.contentWindow.onload = function() {
      iframe.style.display = "none";
      iframe.contentWindow.print();
      setTimeout(function() { document.body.removeChild(iframe) }, 1000);
    }
}

stylesheet_html() {
    let css = [];
    for (let sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
        let sheet = <CSSStyleSheet>document.styleSheets[sheeti];
        try {
          var rules = sheet.cssRules ? sheet.cssRules : sheet.rules;          
            for (let rulei = 0; rulei < rules.length; rulei++) {
                let rule = rules[rulei];
                css.push(rule.cssText);
            }
        } catch (ex) { }
    }
    return css.join('\n');
}
  
  on_print_odds()
  {
    this.modalRef.close();

    if(this.print_sport_model.length==0)
    {
      this.toastrService.info("Please select sports for printing", "Printing");
      return;
    }
    if(this.print_opt_group_model.length == 0)
    {
      this.toastrService.info("Please select option groups for printing", "Printing");
      return;
    }    

    this.dataService.get_printing_odds(this.cacheService.getToken(), this.print_day, this.print_sport_model, this.print_opt_group_model).then(res=>{
      if(res)
      {
        this.print_property(res.sports, res.option_groups);
      }      
    });
  }

  on_select_quick_event(event)
  {
    this.selected_event = event;
    this.selected_event_id = event.qbet;
    this.selected_event_title = event.home_team + " - " + event.away_team;
    this.quick_option_groups.forEach(grp => {
      grp.options.forEach(opt =>{
        opt.value = event.odds[opt.key];
      })
    });
  }

  on_change_quick_event_id()
  {
    this.quick_option_groups.forEach(grp => {
      grp.options.forEach(opt =>{
        opt.value = null;
      })
    });
    this.selected_event_title = "";
    this.selected_event = null;

    let svc = this;
    // selected_event_id
    this.dataService.get_event('', 1, this.selected_event_id).then(res => {
      if(res)
      {
        svc.selected_event = res;
        let event = res;
        this.selected_event_title = event.home_team + " - " + event.away_team;
        this.quick_option_groups.forEach(grp => {
          grp.options.forEach(opt =>{
            opt.value = event.odds[opt.key];
          })
        });

        this.quick_option_id_ele.nativeElement.focus();        
      }
    });
  }

  on_focus_quick_bet_qbet()
  {
    this.quick_qbet_ele.nativeElement.select();
  }

  on_focus_quick_bet_option_id()
  {
    this.quick_option_id_ele.nativeElement.select();
  }
    

  calc_betting()
  {
    let odds = 1;
    this.game_datas.forEach(game=>{
      odds *= parseFloat(game.value);
    })
    this.odds = odds.toFixed(2);

    let res = this.calcService.calc_win(this.game_datas, this.betting_amount, this.game_datas.length);
    this.betting_win_direct = res.win;
    this.betting_apl_direct = res.apl;

    res = this.calcService.calc_win(this.game_datas, this.betting_amount, this.betting_under);    
    this.betting_win_permutation = res.win;
    this.betting_apl_permutation = res.apl;

    this.betting_gain_direct = Math.round((this.betting_win_direct - this.betting_amount) * 100) / 100;
    this.betting_gain_permutation = Math.round((this.betting_win_permutation - this.betting_amount) * 100)/100;

    //get bonus percent
    let bonus_percent = 0;
    let events = this.game_datas.length;    
    this.bonuses.forEach(bonus =>{
      if(bonus.events == events)
      {
        //check min_prize
        let matched = true;
        this.game_datas.forEach(entry =>{
          if(entry.value < bonus.min_prize)
          {
            matched = false;
          }
        })
        if(matched)
          bonus_percent = bonus.percent;
      }
    });
    this.bonus_percent = bonus_percent;
    this.betting_bonus_direct = Math.round( this.bonus_percent * this.betting_win_direct)  / 100;  
  
    this.betting_tot_win_direct = Math.round((this.betting_win_direct + this.betting_bonus_direct) * 100) / 100;
    this.betting_tot_win_permutation = Math.round(this.betting_win_permutation * 100) / 100;
  }

  on_play_event(event, option)
  {
    if(this.is_played(event, option.id)) return;
    if(this.get_option_value(event, option) == null)return;

    let game_data:GameData = null;
    this.game_datas.forEach(game =>{
      if(game.sport == event.sport_id && game.qbet == event.qbet && game.event_date == event.date)
          game_data = game;
    })

    if(game_data == null)
    {
      game_data = new GameData();
      game_data.sport = event.sport_id;
      game_data.sport_key = event.sport_key;
      game_data.qbet = event.qbet;
      game_data.event_date = event.date;
      game_data.event_time = event.time;
      game_data.event_title = event.home_team + ' - ' + event.away_team;  
      game_data.option_name = option.name; 
      game_data.option_id =  option.id;
      game_data.value = this.get_option_value(event, option);
      this.game_datas.push(game_data);
    }
    else
    {
      game_data.option_name = option.name; 
      game_data.option_id =  option.id;
      game_data.value = this.get_option_value(event, option);
    }
    this.calc_betting();
  }

  on_add_new_game()
  {
    if(this.selected_event == null) {
      this.toastrService.info("Please select match!");
      return;
    }
    if(this.selected_option_id == 0) {
      this.toastrService.info("Please select sign code!");      
      return;
    }

    let already_exist = false;
    this.game_datas.forEach(game =>{
      if(game.qbet == this.selected_event.qbet)
        already_exist = true;
    })
    if(already_exist) return;

    let option = null;
    this.quick_option_groups.forEach(grp => {
      grp.options.forEach(opt =>{
        if(this.selected_option_id == opt.id)        
        {
          option = opt;
        }
      })
    });

    if(option.value==null) return;

    let data = new GameData();
    data.qbet = this.selected_event.qbet;
    data.sport = this.selected_event.sport_id;
    data.sport_key = this.selected_event.sport_key;
    data.event_date = this.selected_event.date;
    data.event_time = this.selected_event.time;
    data.event_title = this.selected_event.home_team + ' - ' + this.selected_event.away_team;
    data.option_name = option.name; 
    data.option_id =  option.id;
    data.value = option.value;    
    this.game_datas.push(data);
    this.calc_betting();

    // this.selected_event_id = 0;
    this.selected_event_title = '';    
    this.quick_option_groups.forEach(optGrp =>{
      optGrp.options.forEach(opt =>
        {
          opt.value = null;
        })
    })    
    this.quick_qbet_ele.nativeElement.focus();
  }

  on_remove_event(i)
  {
    this.game_datas.splice(i, 1);

    if(this.betting_under >= this.game_datas.length)
    {
      if(this.game_datas.length >= 2)
        this.betting_under = this.game_datas.length - 1;
      else
        this.betting_under = 1;
    }
    this.calc_betting();
  }

  unders()
  {
    let count = this.game_datas.length;
    let unders = [];
    for(let i=0; i<count -1; i++)
    {
      unders.push({name: 'U' + (i+1), value: i+1});
    }
    return unders;
  }

  fire_login()
  {
    jQuery('#login_button').trigger('click');
  }
  on_make_bet()
  {
    let user = this.cacheService.getUser();
    if(user==null)    
    {
      this.fire_login();
      return;
    }
    if(user.role != 'user' && user.role != 'agency')
    {
      this.toastrService.info(user.role + ' is not allowed to bet!', 'Betting');
      return;
    }

    if(!this.can_make_bet(true))return;
    if(this.game_datas.length == 0) return;
    if(this.betting_mode == "permutation" && this.game_datas.length==1) return;

    let under = this.betting_under;
    if(this.betting_mode == "direct")
      under = this.game_datas.length;

    let events = [];
    this.game_datas.forEach(game =>{
      events.push({event:game.qbet, date:game.event_date, opt:game.option_id, time: game.result_time});
    })
    this.betService.make_bet(this.cacheService.getToken(), events, under, this.betting_amount).then(res=>{
      if(res)
      {
        this.game_datas = [];
        this.info_alert = new alert_data();
        this.info_alert.title = "Betting success!";
        this.last_bet = res.bet;
        this.last_bet_results = JSON.parse(this.last_bet.results);

        this.bet_id = res.betid;        
        this.info_alert.message = "Id: " + this.bet_id;
        GlobalVar.balance = res.balance;
        GlobalVar.balanceUpdateTime = new Date();
      }
      else
      {
        this.info_alert = new alert_data();
        this.info_alert.title = "Betting failed!";
        this.info_alert.message = this.betService._message;
      }
    });

  }

  on_make_book()
  {
    if(!this.can_make_bet(false))return;    

    if(this.game_datas.length == 0) return;
    if(this.betting_mode == "permutation" && this.game_datas.length==1) return;

    let under = this.betting_under;
    if(this.betting_mode == "direct")
      under = this.game_datas.length;

    let events = [];
    this.game_datas.forEach(game =>{
      events.push({sport: game.sport, sport_key: game.sport_key, event:game.qbet, date:game.event_date, opt:game.option_id, time: game.result_time});
    })
    this.bookService.make_book('', 'football', events, under, this.betting_amount).then(res=>{
      if(res)
      {
        this.game_datas = [];
        this.info_alert = new alert_data();
        this.info_alert.title = "Booking success!";
        this.info_alert.message = "Id: " + res;
        this.book_id = res;
        this.last_bet = null;
      }
      else
      {
        this.toastrService.error(this.bookService._message, "Make Book!");
      }
    });
  }

  on_get_book()
  {
    if(this.book_id == 0) return;
    let svc = this;
    this.bookService.get_book('', this.book_id).then(res => {
      if(!res)
      {
        svc.game_datas = [];
        svc.error_alert = new alert_data();
        svc.error_alert.title = "Get book!";
        svc.error_alert.message = svc.betService._message;
      }
      else
      {
        svc.game_datas = res.events;
        svc.betting_amount = res.amount;
        svc.betting_under = res.under;
        svc.calc_betting();
      }
    });
  }


  on_show_latest_win_result(modalContent)
  {
    let options: any = {
      size: "dialog-centered",
      // container: '.app'
    };
    this.modalRef = this.modalService.open(modalContent, options);    
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  } 

  get_option_relation(optid)
  {
    let relation = '';
    this.options.forEach(opt =>{
      if(opt.id == optid)
        relation = opt.relation;
    })
    return relation;
  }

  can_make_bet(check_balance:boolean)
  {
    if(check_balance)
    {
      if(this.betting_amount > GlobalVar.balance)
      {
        this.toastrService.info("Insufficient balance!");
        return false;
      }
    }

    if(this.betting_amount < 0)
    {
      this.toastrService.info("Incorrect amount balance!");
      return false;
    }
    if(this.betting_amount > this.settings.max_stake)
    {
      this.toastrService.info("The amount exceed the max stake " + this.settings.max_stake);
      return false;
    }

    if(this.game_datas.length < this.settings.min_events_per_ticket)
    {
      this.toastrService.info("Please select at least " + this.settings.min_events_per_ticket + ' evetns!');
      return false;
    }

    if(this.game_datas.length > this.settings.max_events_per_ticket)
    {
      this.toastrService.info("Events exceed the max events " + this.settings.max_events_per_ticket);
      return false;
    }    

    let totalOdds = Number(this.odds);
    if(totalOdds < this.settings.min_total_odd)
    {
      this.toastrService.info("Please add more games till odd greate than " + this.settings.min_total_odd);
      return false;
    }

    if(totalOdds > this.settings.max_total_odd)
    {
      this.toastrService.info("Please remove some games till odd less than " + this.settings.max_total_odd);
      return false;
    }
    return true;
  }

  get_week_info()
  {
    let week = this.cacheService.getWeekInfo();
    if(week==null) return '';
    return 'Week: ' + week.week + ' (' + week.from + ' ~ ' + week.to + ')';
  }

  updateAllDatas(){
    this.refresh_leagues();
    this.on_change_upcoming_event_count();
    this.refresh_latest_matches();    
  } 

  on_view_latest_match(ev, modalContent)
  {
    this.latest_matche = ev;
    let options: any = {
      size: "dialog-centered",
      // container: '.app'
    };
    this.modalRef = this.modalService.open(modalContent, options);    
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  on_print_bet(ticketModalContent)
  {
    let url = location.origin + "/ticket-view?betid=" + this.last_bet.bet_id;
    window.open(url, '_blank', 'toolbar=0, width=400, height=500');

    // let options: any = {
    //   size: "dialog-centered",
    //   // container: '.app'
    // };
    // this.modalRef = this.modalService.open(ticketModalContent, options);
    // GlobalVar.latestModal =  this.modalRef;

    // this.modalRef.result.then((result) => {
    // }, (reason) => {
    // });
  }


  last_adjust_y:number = 0;

  adjust_screen()
  {
    if(window.innerWidth <= 768){
      this.is_mobile_mode = true;
      this.last_adjust_y = 0;
      jQuery('#couponarea-prfix').height(0); 
      return;
    }      
    else
      this.is_mobile_mode = false;

    let events_heigt = 46 * this.game_datas.length + 400;
    var scroll = window.pageYOffset;
    if(scroll <= 150)
    {
      this.last_adjust_y = scroll;      
      jQuery('#couponarea-prfix').height(0);
    }
    else if(Math.abs(scroll - this.last_adjust_y) >= events_heigt)
    {
      let left_height = jQuery('#left-area').height();
      let main_height = jQuery('#main-area').height();
      let right_height = jQuery('#right-area').height();
      let prefix_height = jQuery('#couponarea-prfix').height(); 
      right_height -= prefix_height;

      let max_height = Math.max(left_height, main_height);

      let n_height;      
      if(right_height >= max_height)
      {
        n_height = 0;
      }
      else if(right_height + scroll >= max_height)
      {
        n_height = max_height - right_height - 50;
      }
      else
      {
        n_height = Math.max(scroll - 150, 0);
      }
      this.last_adjust_y = scroll;      
      jQuery('#couponarea-prfix').height(n_height); 
    }
  }

  


  @HostListener('window:resize')
  public onWindowResize():void {    
    this.adjust_screen();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {    
    this.adjust_screen();
  }

}






