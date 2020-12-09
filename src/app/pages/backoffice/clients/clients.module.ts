import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperatorComponent } from './operator/operator.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { AgencyComponent } from './agency/agency.component';
import { UserComponent } from './user/user.component';



export const routes = [
  { path: '', redirectTo: 'operator', pathMatch: 'full'},
  { path: 'operator', component: OperatorComponent, data: { breadcrumb: 'Operator' } },  
  { path: 'agency', component: AgencyComponent, data: { breadcrumb: 'Operator' } },
  { path: 'user', component: UserComponent, data: { breadcrumb: 'Operator' } }  
];

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    NgxDatatableModule, 
    PipesModule,   
    FormsModule,        
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OperatorComponent,
    AgencyComponent,
    UserComponent
  ]
})
export class ClientsModule { }
