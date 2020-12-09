import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferComponent } from './transfer/transfer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';




export const routes = [
  { path: '', redirectTo: 'transfer-list', pathMatch: 'full'},
  { path: 'transfer-list', component: TransferListComponent, data: { breadcrumb: 'Transfer List' } },
  { path: 'transfer', component: TransferComponent, data: { breadcrumb: 'Transfer' } },
];

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    NgxDatatableModule,    
    FormsModule,        
    Ng2SmartTableModule,
    PipesModule,    
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TransferListComponent,
    TransferComponent
  ]
})
export class TransfersModule { }
