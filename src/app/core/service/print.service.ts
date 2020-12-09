import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../Config';
import {Country, DayEvents, OptionGroup, LeagueData} from '../model';
// import { Cell, Row, Table} from 'ng-pdf-make/objects/table';
import { ColorHelper } from '@swimlane/ngx-charts';


@Injectable({
  providedIn: 'root'
})
export class PrintService {

  width: number = 1000;
  qbet_col_width: number = 50;
  date_col_width: number = 50;
  time_col_width: number = 50;
  event_col_width: number = 200;
  options_width:number = 0;

  constructor() {
    this.options_width = this.width - (this.qbet_col_width + this.date_col_width + this.time_col_width + this.event_col_width);
  }

  getDocumentDefinition() {
    
  }

  getFormattedDate(datestr) {
    let date = new Date(datestr);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');  
    return month + '/' + day + '/' + year;
  }

  make_odd_table(sportname: string, option_groups: OptionGroup[], leagues:any[])
  {
    //make thead
    let totla_cols = 3;
    option_groups.forEach(optgrp=>{
      totla_cols += optgrp.options.length;
    });
    
    let thead = '<thead hidden><tr>';
    for(let i=0; i<totla_cols; i++) thead += '<td></td>';
    thead += '</tr></thead>';

    //make top 2 rows
    let topRow1 = '<tr><td colspan="3"><b>' + sportname + '</b></td>';
    option_groups.forEach(optgrp =>{
      topRow1 += '<td class="text-center" colspan="' + optgrp.options.length + '"><b>' + optgrp.name + '</b></td>';
    })
    topRow1 +='</tr>';

    let topRow2 = '<tr><td><b>Qbet</b></td><td><b>Time</b></td><td><b>Event</b></td>';
    option_groups.forEach(optgrp =>{
      optgrp.options.forEach(opt=>{
        topRow2 += '<td><b>' + opt.name + '</b></td>';
      });      
    })
    topRow2 +='</tr>';

    let rows = [];
    leagues.forEach(league=>{      
      //make league header
      let row = '<tr><td colspan="' + totla_cols + '"><b>' + this.getFormattedDate(league.date) + ' - ' + league.country + ' - ' + league.name + '<b></td><tr>';
      rows.push(row);

      //draw matches
      league.matches.forEach(match => {
        let row1 = '<tr><td>' + match.qbet + '</td><td>' + match.time + '</td><td>' + match.match + '</td>';
        match.odds.forEach(val =>{
          row1 += '<td>' + val + '</td>';
        });
        row1 += '</tr>';
        rows.push(row1);
      });
    });

    let contents = '';
    // split to each pages
    for(let iStart=0; iStart<rows.length; iStart+=44)
    {
      let tableStr = '<h1><i class="fa fa-star-half-o"></i>bet2star<i class="fa fa-star-half-o"></i></h1>';
      tableStr += '<table class="table table-sm table-bordered">' + thead + '<tbody>' + topRow1 + topRow2;
      let iTo = Math.min(iStart + 44, rows.length);
      for(let i=iStart; i < iTo; i++)
      {
        tableStr +=rows[i];        
      }
      tableStr += '</tbody></table>' + '<div class="page-break"></div>';
      contents += tableStr;
    }
    return contents;
  }


  make_bet_result_page(user, bet)
  {

  }

}
