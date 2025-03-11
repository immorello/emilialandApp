import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleVipPageRoutingModule } from './single-vip-routing.module';

import { SingleVipPage } from './single-vip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleVipPageRoutingModule
  ],
  declarations: [SingleVipPage]
})
export class SingleVipPageModule {}
