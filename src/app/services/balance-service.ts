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
}
