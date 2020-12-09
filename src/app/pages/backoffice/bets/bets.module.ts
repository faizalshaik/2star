import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BetListComponent } from './bet-list/bet-list.component';
import { BetReportComponent } from './bet-report/bet-report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BettorReportComponent } from './bettor-report/bettor-report.component';



export const routes = [
  { path: '', redirectTo: 'bet-list', pathMatch: 'full'},
  { path: 'bet-list', component: BetListComponent, data: { breadcrumb: 'BetList' } },
  { path: 'bet-report', component: BetReportComponent, data: { breadcrumb: 'Bet Report' } },
  { path: 'bettor-report', component: BettorReportComponent, data: { breadcrumb: 'Bettor Report' } },
];

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    NgxDatatableModule,    
    FormsModule,        
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BetListComponent,
    BetReportComponent,
    BettorReportComponent
  ]
})
export class BetsModule { }
