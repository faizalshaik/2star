import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DataBaseComponent } from './database/database.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SettingComponent } from './setting/setting.component';
import { BonusComponent } from './bonus/bonus.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OddLimitComponent } from './odd-limit/odd-limit.component';
import { CommissionComponent } from './commission/commission.component';


export const routes = [
  { path: '', redirectTo: 'total', pathMatch: 'full'},
  { path: 'database', component: DataBaseComponent, data: { breadcrumb: 'Database' }},
  { path: 'setting', component: SettingComponent, data: { breadcrumb: 'Setting' }}, 
  { path: 'bonus', component: BonusComponent, data: { breadcrumb: 'Bonus' }}, 
  { path: 'oddlimit', component: OddLimitComponent, data: { breadcrumb: 'Odd Limit'}},
  { path: 'commission', component: CommissionComponent, data: { breadcrumb: 'Commission'}},    
];

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    NgxDatatableModule,
    Ng2SmartTableModule,        
    FormsModule,        
    NgxChartsModule,    
    PipesModule,    
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()   
  ],
  declarations: [
    DataBaseComponent,
    SettingComponent,
    BonusComponent,
    OddLimitComponent,
    CommissionComponent
  ]
})
export class MaintainModule { }
