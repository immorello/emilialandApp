import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleStoryPageRoutingModule } from './single-story-routing.module';

import { SingleStoryPage } from './single-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleStoryPageRoutingModule
  ],
  declarations: [SingleStoryPage]
})
export class SingleStoryPageModule {}
