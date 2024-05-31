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
  },
  {
    path: 'graph-dashboard',
    loadComponent: () => import('./main/graph-dashboard/graph-dashboard.component')
  }
];
