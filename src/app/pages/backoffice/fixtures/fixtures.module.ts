import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LatestResultComponent } from './latest-result/latest-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProgComponent } from './new-prog/new-prog.component';
import { ToastrModule } from 'ngx-toastr';
import { DefineResultComponent } from './define-result/define-result.component';
import { DefinePrizeComponent } from './define-prize/define-prize.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';


export const routes = [
  { path: '', redirectTo: 'total', pathMatch: 'full'},
  { path: 'latest-result', component: LatestResultComponent, data: { breadcrumb: 'Latest result' } },
  { path: 'new-prog', component: NewProgComponent, data: { breadcrumb: 'New Prog' } } ,
  { path: 'define-result', component: DefineResultComponent, data: { breadcrumb: 'Define Result' } } ,
  { path: 'define-prize', component: DefinePrizeComponent, data: { breadcrumb: 'Define Prize' } }
];

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    NgxDatatableModule,    
    FormsModule,        
    PipesModule,    
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()   
  ],
  declarations: [
    LatestResultComponent,
    NewProgComponent,
    DefineResultComponent,
    DefinePrizeComponent        
  ]
})
export class FixturesModule { }
