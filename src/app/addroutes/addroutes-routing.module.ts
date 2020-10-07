import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddroutesPage } from './addroutes.page';

const routes: Routes = [
  {
    path: '',
    component: AddroutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddroutesPageRoutingModule {}
