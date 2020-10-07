import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddroutesPageRoutingModule } from './addroutes-routing.module';

import { AddroutesPage } from './addroutes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddroutesPageRoutingModule
  ],
  declarations: [AddroutesPage]
})
export class AddroutesPageModule {}
