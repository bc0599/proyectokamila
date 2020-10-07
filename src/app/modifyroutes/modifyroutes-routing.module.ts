import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyroutesPage } from './modifyroutes.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyroutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyroutesPageRoutingModule {}
