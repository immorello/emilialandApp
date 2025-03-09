import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recipies',
    loadChildren: () => import('./recipies/recipies.module').then( m => m.RecipiesPageModule)
  },
  {
    path: 'reggiani-illustri',
    loadChildren: () => import('./reggiani-illustri/reggiani-illustri.module').then( m => m.ReggianiIllustriPageModule)
  },
  {
    path: 'storie-reggiane',
    loadChildren: () => import('./storie-reggiane/storie-reggiane.module').then( m => m.StorieReggianePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
