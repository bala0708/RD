import { Routes, RouterModule }  from '@angular/router';
import { HomeComponent } from './home.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/register/register.module#RegisterModule'
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
