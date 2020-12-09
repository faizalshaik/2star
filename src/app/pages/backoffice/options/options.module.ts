import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { OptionComponent } from './option/option.component';
import { GroupComponent } from './group/group.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GroupOptionComponent } from './group-option/group-option.component';
export const routes = [
  { path: '', redirectTo: 'country', pathMatch: 'full'},
  { path: 'options', component: OptionComponent, data: { breadcrumb: 'Options' } },
  { path: 'groups', component: GroupComponent, data: { breadcrumb: 'Groups' } },
  { path: 'option-groups', component: GroupOptionComponent, data: { breadcrumb: 'Groups' } }
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
    RouterModule.forChild(routes),
    ToastrModule.forRoot()        
  ],
  declarations: [
    OptionComponent,
    GroupComponent,
    GroupOptionComponent
  ],
})
export class OptionsModule { }
