import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipiesPageRoutingModule } from './recipies-routing.module';

import { RecipiesPage } from './recipies.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipiesPageRoutingModule,
    ScrollingModule
  ],
  declarations: [RecipiesPage]
})
export class RecipiesPageModule {}
