import { Routes } from '@angular/router';

import { Landing } from './pages/landing/landing';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Guest } from './pages/guest/guest';
import { AuthTest } from './pages/auth-test/auth-test';

import { App } from './pages/app/app';
import { authGuard } from './core/guards/auth-guard';


import { RequestStateTest } from './pages/request-state-test/request-state-test';

import { PublicLayout } from './layouts/public-layout/public-layout';


export const routes: Routes = [

  {
    path: 'app',
    component: App,
    canActivate: [authGuard],
  },

  {
    path: '',
    component: PublicLayout,
    children: [

      {
        path: '',
        component: Landing,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'guest',
        component: Guest,
      },
    ],
  },


  // Temporary developer diagnostic page.
  {
    path: 'auth-test',
    component: AuthTest,
  },

  //temporary request state test
  {
    path: 'request-state-test',
    component: RequestStateTest,
  },


  // Unknown routes return to the landing page.
  {
    path: '**',
    redirectTo: '',
  },
];