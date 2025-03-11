import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleRecipiePageRoutingModule } from './single-recipie-routing.module';

import { SingleRecipiePage } from './single-recipie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleRecipiePageRoutingModule
  ],
  declarations: [SingleRecipiePage]
})
export class SingleRecipiePageModule {}
