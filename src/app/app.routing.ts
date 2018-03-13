import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const appRouting = RouterModule.forRoot(appRoutes, { useHash: true });