import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReggianiIllustriPageRoutingModule } from './reggiani-illustri-routing.module';

import { ReggianiIllustriPage } from './reggiani-illustri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReggianiIllustriPageRoutingModule
  ],
  declarations: [ReggianiIllustriPage]
})
export class ReggianiIllustriPageModule {}
