import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './component/admin-home/admin-home.component';
import {UserListComponent} from './component/user-list/user-list.component';
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {EventListComponent} from './component/event-list/event-list.component';
import {StatisticalComponent} from './component/statistical/statistical.component';
import {EventDetailComponent} from './component/event-detail/event-detail.component';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';

const routes: Routes = [
  {
    path: 'admin', component: AdminHomeComponent,
    children: [
      {path: 'user/list' , component: UserListComponent},
      {path: 'user/detail/:code' , component: UserDetailComponent},
      {path: 'event/list' , component: EventListComponent},
      {path: 'event/detail/:id' , component: EventDetailComponent},
      {path: 'home' , component: StatisticalComponent},
      {path: 'update/password', component: ChangePasswordComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [ {provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
