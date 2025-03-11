import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleRecipiePage } from './single-recipie.page';

const routes: Routes = [
  {
    path: '',
    component: SingleRecipiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleRecipiePageRoutingModule {}
