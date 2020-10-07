import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyroutesPageRoutingModule } from './modifyroutes-routing.module';

import { ModifyroutesPage } from './modifyroutes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyroutesPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModifyroutesPage]
})
export class ModifyroutesPageModule {}
