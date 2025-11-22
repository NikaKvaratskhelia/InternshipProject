import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number>(0);
  public balance$ = this.balanceSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('balance');
    const parsed = stored ? Number(stored) : 0;
    this.balanceSubject.next(parsed);
  }

  setBalance(amount: number) {
    this.balanceSubject.next(amount);
    localStorage.setItem('balance', String(amount));
  }

  checkout(totalAmount: number): boolean {
    const currentBalance = this.balanceSubject.value;

    if (currentBalance < totalAmount) {
      console.error('Insufficient balance!');
      return false;
    }

    const newBalance = currentBalance - totalAmount;
    this.setBalance(newBalance);

    localStorage.removeItem('cart');

    console.log('Checkout successful! Remaining balance:', newBalance);
    return true;
  }
}
