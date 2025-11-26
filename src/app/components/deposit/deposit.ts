import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceService } from '../../services/balance-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  imports: [ReactiveFormsModule],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss',
})
export class Deposit {
  public errorMessage: string = '';
  public prevBalance: number = 0;
  public showPopup: boolean = false;

  constructor(private balanceService: BalanceService, private router: Router) {
    this.balanceService.balance$.subscribe((b) => {
      this.prevBalance = b;
    });
  }

  public paymentInfo: FormGroup = new FormGroup({
    cardNum: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:\d{4} ?){3}\d{4}$/),
    ]),
    cardDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2]) ?\/ ?\d{4}$/),
    ]),
    cardCvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3,4}$/)]),
    cardOwner: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z .']{2,}$/)]),
    depo: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
  });

  deposit() {
    if (this.paymentInfo.value.depo <= 0) {
      this.errorMessage = $localize`Minimum value for deposit is 1$.`;
      return;
    }

    const newBalance = this.prevBalance + Number(this.paymentInfo.value.depo);
    this.balanceService.setBalance(newBalance);

    this.showPopup = true;
    this.errorMessage = $localize`Deposit successful!`
    setTimeout(() => {
      this.showPopup = false;
      this.router.navigate(['/']);
    }, 2000);
  }

  formatCardNum(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    this.paymentInfo.get('cardNum')?.setValue(input.value, { emitEvent: false });
  }

  formatDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let v = input.value.replace(/\D/g, '');
    if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2, 6);
    input.value = v;
    this.paymentInfo.get('cardDate')?.setValue(input.value, { emitEvent: false });
  }

  lettersOnly(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z .']/g, '');
    this.paymentInfo.get('cardOwner')?.setValue(input.value, { emitEvent: false });
  }

  digitsOnly(event: Event) {
    const input = event.target as HTMLInputElement;

    const controlName = input.getAttribute('formControlName');
    if (!controlName) return;

    let cleaned = input.value.replace(/\D/g, '');
    cleaned = cleaned.replace(/^0+/, '');
    input.value = cleaned;

    const control = this.paymentInfo.get(controlName);
    control?.setValue(cleaned, { emitEvent: false });
    control?.updateValueAndValidity();
  }
}
