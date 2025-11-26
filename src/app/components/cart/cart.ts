import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../services/balance-service';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  modelPath: string;
  photos: string[];
}

@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  public total: number = 0;
  public cart: any;
  public showPopup: boolean = false;
  public errorMessage: string = '';

  constructor(private balanceService: BalanceService) {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.getTotal();
  }

  getTotal() {
    this.total = 0;
    this.cart.forEach((e: any) => {
      this.total += e.qty * e.price;
    });
  }

  decreaseQty(item: any) {
    const index = this.cart.findIndex((cartItem: any) => cartItem.id === item.id);
    console.log(index);

    if (index <= -1) return console.log('returned');

    if (this.cart[index].qty > 1) {
      this.cart[index].qty--;
      console.log('decreased');
    } else {
      this.cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.getTotal();
  }

  increaseQty(item: any) {
    const index = this.cart.findIndex((cartItem: any) => cartItem.id === item.id);

    console.log(index);
    if (index <= -1) return;

    this.cart[index].qty++;

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.getTotal();
  }

  removeFromCart(item: any) {
    const index = this.cart.findIndex((cartItem: any) => cartItem.id === item.id);

    console.log(index);

    if (index <= -1) return;

    this.cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.getTotal();
  }

  checkout() {
    this.showPopup = true;

    if (!this.balanceService.checkout(this.total)) {
      this.errorMessage = $localize`Insufficient balance!`;
    } else {
      this.errorMessage = $localize`Checkout Successful!`;
    }

    setTimeout(() => {
      this.showPopup = false;
      this.errorMessage = '';
    }, 1000);

    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');

    console.log(this.cart);
  }
}
