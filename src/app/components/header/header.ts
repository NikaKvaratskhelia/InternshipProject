import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../services/balance-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public balance$;

  constructor(private balanceService: BalanceService) {
    this.balance$ = this.balanceService.balance$;
  }
}
