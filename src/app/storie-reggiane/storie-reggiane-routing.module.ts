import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorieReggianePage } from './storie-reggiane.page';

const routes: Routes = [
  {
    path: '',
    component: StorieReggianePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorieReggianePageRoutingModule {}
