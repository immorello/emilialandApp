import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipiesPage } from './recipies.page';

const routes: Routes = [
  {
    path: '',
    component: RecipiesPage
  },
  {
    path: ':recipieId',
    loadChildren: () => import('./single-recipie/single-recipie.module').then( m => m.SingleRecipiePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipiesPageRoutingModule {}
