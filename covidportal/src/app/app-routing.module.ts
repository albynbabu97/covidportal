import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { CountryComponent } from './application/country/country.component';
import { DashboardComponent } from './application/dashboard/dashboard.component';
import { EditdetailsComponent } from './application/editdetails/editdetails.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ApplicationComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AuthGuard],
      },
      {
        path: 'countrystat',
        component: CountryComponent, canActivate: [AuthGuard],
      },
      {
        path: 'editdetails',
        component: EditdetailsComponent, canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
