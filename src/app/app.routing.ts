import { Routes } from '@angular/router';
import { IsSignedGuard } from './guards/is-signed.guard';
import { LogoutGuard } from './guards/logout.guard';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent, 
    data :{
      title : 'authentification',
      
    },
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '', 
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard', canActivate:[IsSignedGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
  
    ]
  }
];

