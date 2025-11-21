import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Details } from './components/details/details';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'details/:id',
    component: Details,
  },
];
