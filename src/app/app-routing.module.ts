import {Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { AuthGuardService as AuthGuard } from './core/services/auth/auth-guard.service';

import {PagesComponent} from './modules/pages.component';
import {NotFoundComponent} from './modules/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: () => import ('./modules/home/home.module').then(m => m.HomeModule)
            }, {
                path: 'etablissements',
                loadChildren: () => import ('./modules/etablissements/etablissements.module').then(m => m.EtablissementsModule)
            }, {
                path: 'login',
                loadChildren: () => import ('./modules/auth/login/login.module').then(m => m.LoginModule)
            }, {
                path: 'register',
                loadChildren: () => import ('./modules/auth/register/register.module').then(m => m.RegisterModule)
            }, {
                path: 'account',
                canActivate: [AuthGuard],
                loadChildren: () => import ('./modules/account/account.module').then(m => m.AccountModule)
            }, {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: () => import ('./modules/users/users.module').then(m => m.UsersModule)
            }
        ]
    }, {
        path: '**',
        component: NotFoundComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
});
