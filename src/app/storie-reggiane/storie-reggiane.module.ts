import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorieReggianePageRoutingModule } from './storie-reggiane-routing.module';

import { StorieReggianePage } from './storie-reggiane.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorieReggianePageRoutingModule
  ],
  declarations: [StorieReggianePage]
})
export class StorieReggianePageModule {}
