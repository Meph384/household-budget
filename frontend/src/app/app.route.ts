import { Routes } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'log-in'
  },
  {
    path: 'table',
    loadComponent: () => import('./features/table/table.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'graph-dashboard',
    loadComponent: () => import('./main/graph-dashboard/graph-dashboard.component'),
    canActivate: [AuthGuard]
  },
  {
    path: 'log-in',
    loadComponent: () => import('./auth/log-in/log-in.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component')
  }
];
