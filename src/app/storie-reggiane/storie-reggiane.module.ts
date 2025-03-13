import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorieReggianePageRoutingModule } from './storie-reggiane-routing.module';

import { StorieReggianePage } from './storie-reggiane.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorieReggianePageRoutingModule,
    ScrollingModule
  ],
  declarations: [StorieReggianePage]
})
export class StorieReggianePageModule {}
