import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AdminHomeComponent} from './component/admin-home/admin-home.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {LeftSidebarComponent} from './component/left-sidebar/left-sidebar.component';
import {EventListComponent} from './component/event-list/event-list.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {UserListComponent} from './component/user-list/user-list.component';
import {CssComponent} from './component/css/css.component';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StatisticalComponent } from './component/statistical/statistical.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AdminHomeComponent,
    NavbarComponent,
    LeftSidebarComponent,
    EventListComponent,
    UserDetailComponent,
    UserListComponent,
    CssComponent,
    StatisticalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ChartsModule,
  ]
})
export class AdminModule { }
