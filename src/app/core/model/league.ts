export class Country{
    id:number = 0;
    name:string = '';
    ios2:string = '';    
    logo:string = '';
    leagues: League[] = [];
}

export class SportData{
    id:number = 0;
    name:string = '';
    key:string = '';
    countries: Country[] = [];
}

export class League{
    id:number = 0;
    name:string = '';
    logo:string = '';
}

export class FootBallFixture{
    key:number = 0;
    date:string = '';
    time:string = '';
    home_team:string = '';
    away_team:string = '';
    halftime_result:string = '';
    final_result:string = '';
    status:string = '';
    league_round:string = '';
    league_season:string = '';
    home_team_logo:string = '';
    away_team_logo:string = '';
    home_formation:string = '';
    away_formation:string = '';
    referee:string = '';
    stadium:string = '';
}


export class OptionData{
    expanded: boolean =  false;
    selected: string = '';
    opts: string[] = [];
}

export class Option{
    id: number = 0;
    name:string ='';
    key:string ='';
    relation:string = '';
    value:string = '';
}
export class OptionGroup{
    id:number = 0;
    name:string ='';
    max_odd:number = 0;
    odd_increase:number = 0;
    options: Option[] = [];
}

export class OptionGroupSelecting
{
    id: number = 1;
    name: string= "Main";
    expanded: boolean = false;
    options: Option[] = [];
}

export class EventEntry{
    qbet: number = 0; 
    sport_id:number = 0;   
    sport_key:string = '';
    date:string = '';
    time:string = '';
    home_team:string = '';
    away_team:string = '';
    home_team_logo:string = '';
    away_team_logo:string = '';
    odds:any = null;
    options: any[] = [];
}

export class DayEvents{
    week:any;
    date:string = '';
    events:EventEntry[] =[];
}

export class LeagueData{
    sport:string = '';
    country_name: string ='';
    country_logo: string ='';    
    league_name: string ='';
    league_logo: string ='';
    days: DayEvents[] = [];
}


export class GameData{
    sport:number;
    sport_key:string;
    qbet :number;
    event_date: string='';
    event_time: string='';
    event_title: string ='';
    option_id: number = 0;
    option_name: string = '';
    result_time: string = 'ft';
    value: string = '';
}


export class CouponData{
    events: GameData[] = [];
    amount: number = 0;
    under:number = 0;
}

export class alert_data{
    title: string = '';
    message: string = '';
}


export class GameMenu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public href: string,
                public logo: string,
                public target: string,
                public hasSubMenu: boolean,
                public childCount: number,
                public parentId: number,
                
                public leagueId: number,
                public sport: number, 
                ) { }
} 



export class Group{
    id: number = 0;
    name:string ='';
    descr:string ='';    
}


export class Group_Option{
    id: number = 0;
    group_id:number = 0;
    option_id:number = 0;
}

export class UserInfomation{
    id:number;
    login:string ='';
    email:string='';
    role:string='';
    password:string='';

    name:string ='';
    surname:string ='';
    language:string ='';
    birth:string='';
    place:string='';
    gender:string='Male';
    address:string='';
    phone:string='';
    mobile:string='';
    fax:string='';    
    parent_id:number = 0;
    created_at: string='';
    status:number = 0;
    is_terminal:number = 0;
}