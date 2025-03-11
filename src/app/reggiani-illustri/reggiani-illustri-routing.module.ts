import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReggianiIllustriPage } from './reggiani-illustri.page';

const routes: Routes = [
  {
    path: '',
    component: ReggianiIllustriPage
  },
  {
    path: ':vipId',
    loadChildren: () => import('./single-vip/single-vip.module').then( m => m.SingleVipPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReggianiIllustriPageRoutingModule {}
