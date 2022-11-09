import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminModule} from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { APP_BASE_HREF } from '@angular/common';
import {SecurityModule} from './security/security.module';
import {ToastrModule} from 'ngx-toastr';







@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 2000,
      extendedTimeOut: 1000
    }),
    AdminModule,
    SecurityModule
  ],
  providers: [ authInterceptorProviders,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
