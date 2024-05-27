import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table'
  },
  {
    path: 'table',
    loadComponent: () => import('./features/table/table.component')
  }
];