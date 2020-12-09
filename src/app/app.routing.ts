import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BetsListComponent } from './pages/bets-list/bets-list.component';
import { BetsReportComponent } from './pages/bets-report/bets-report.component';
import { ResultsComponent } from './pages/results/results.component';
import { TransfersListComponent } from './pages/transfers-list/transfers-list.component';
import { PrintTicketComponent } from './pages/print-ticket/print-ticket.component';

export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,
    children:[
      { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },  
      { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
      { path: 'bets-list', component: BetsListComponent, data: { breadcrumb: 'BetsList' } },
      { path: 'bets-report', component: BetsReportComponent, data: { breadcrumb: 'BetsReport' } },      
      { path: 'results', component: ResultsComponent, data: { breadcrumb: 'Results' } },     
      { path: 'transfer', component: TransfersListComponent, data: { breadcrumb: 'Results' } }, 

      { path: 'backoffice/bets', loadChildren: './pages/backoffice/bets/bets.module#BetsModule', data: { breadcrumb: 'Bets' }},
      { path: 'backoffice/clients', loadChildren: './pages/backoffice/clients/clients.module#ClientsModule', data: { breadcrumb: 'Clients' }},
      { path: 'backoffice/fixtures', loadChildren: './pages/backoffice/fixtures/fixtures.module#FixturesModule', data: { breadcrumb: 'Fixtures' }},      
      { path: 'backoffice/options', loadChildren: './pages/backoffice/options/options.module#OptionsModule', data: { breadcrumb: 'Options' }},
      { path: 'backoffice/transfers', loadChildren: './pages/backoffice/transfers/transfers.module#TransfersModule', data: { breadcrumb: 'Transfers' }},      
      { path: 'backoffice/maintain', loadChildren: './pages/backoffice/maintain/maintain.module#MaintainModule', data: { breadcrumb: 'Maintain' }},
    ]
  },
  
  { path: 'ticket-view', component: PrintTicketComponent},

  { path: 'confirm-register', component: ConfirmRegisterComponent, data: { breadcrumb: 'Confirm register' } },
  // { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  // { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
  // useHash: true
});