import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminRoutingModule} from './admin/admin-routing.module';


const routes: Routes = [

  {path: '' , redirectTo: '/admin' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminRoutingModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
