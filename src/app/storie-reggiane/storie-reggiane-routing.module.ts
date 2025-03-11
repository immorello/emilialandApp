import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorieReggianePage } from './storie-reggiane.page';

const routes: Routes = [
  {
    path: '',
    component: StorieReggianePage
  },
  {
    path: ':storyId',
    loadChildren: () => import('./single-story/single-story.module').then( m => m.SingleStoryPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorieReggianePageRoutingModule {}
