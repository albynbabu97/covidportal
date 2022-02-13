import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { DashboardComponent } from './application/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { CountryComponent } from './application/country/country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditdetailsComponent } from './application/editdetails/editdetails.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "fgsColor": "#4e43ff",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "rectangle-bounce-pulse-out",
  "overlayColor": "rgba(255,255,255,0.61)",
  "pbColor": "#4e43ff",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,
    DashboardComponent,
    CountryComponent,
    EditdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    JwPaginationModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
