import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Details } from './components/details/details';
import { Deposit } from './components/deposit/deposit';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'details/:id',
    component: Details,
  },
  {
    path: 'deposit',
    component: Deposit,
  },
  {
    path: 'cart',
    component: Cart,
  },
];
