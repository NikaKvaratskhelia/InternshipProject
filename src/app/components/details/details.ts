import { Component } from '@angular/core';
import { Canvas } from '../canvas/canvas';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  modelPath: string;
  photos: string[];
}

@Component({
  selector: 'app-details',
  imports: [Canvas, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  public jewelry: Product[] = [
    {
      id: 1,
      name: 'Black Standart Ring',
      description:
        'Minimalist black-coated ring designed for everyday wear. Clean, modern, and built to complement any style without trying too hard.',
      price: 24,
      modelPath: 'Assets/Models/basicRing.glb',
      photos: [
        'Assets/images/blackRing.webp',
        'Assets/images/blackRing1.webp',
        'Assets/images/blackRing2.webp',
      ],
    },
    {
      id: 2,
      name: 'Magic Ring',
      description:
        'A standout ring featuring detailed engravings and gemstone highlights. Crafted to look mystical without feeling cheap or gimmicky.',
      price: 147,
      modelPath: 'Assets/Models/magic_ring.glb',
      photos: [
        'Assets/images/magicRing.webp',
        'Assets/images/magicRing2.webp',
        'Assets/images/magicRing3.webp',
      ],
    },
    {
      id: 3,
      name: 'Pearl Necklace',
      description:
        'Elegant freshwater-style pearls arranged in a classic strand. Soft shine, timeless look, and perfect for elevating any outfit.',
      price: 85,
      modelPath: 'Assets/Models/pearlNecklace.glb',
      photos: [
        'Assets/images/pearlNecklace.webp',
        'Assets/images/pearlNecklace1.webp',
        'Assets/images/pearlNecklace2.webp',
      ],
    },
  ];

  public currentIndex = 0;
  public id: number | null = null;
  public wantedProduct: Product | undefined;
  public wantedPhoto: 'gallery' | '3d' = 'gallery';

  constructor(private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id !== null) {
      this.wantedProduct = this.jewelry.find((j) => j.id === this.id);
    }
  }

  prev() {
    if (!this.wantedProduct) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.wantedProduct.photos.length) % this.wantedProduct.photos.length;
  }

  next() {
    if (!this.wantedProduct) return;
    this.currentIndex = (this.currentIndex + 1) % this.wantedProduct.photos.length;
  }

  addToCart() {
    if (!this.wantedProduct) return;

    const product = {
      id: this.wantedProduct.id,
      name: this.wantedProduct.name,
      description: this.wantedProduct.description,
      price: this.wantedProduct.price,
      modelPath: this.wantedProduct.modelPath,
      photos: this.wantedProduct.photos?.slice(0, 3) || [],
      qty: 1,
    };

    const cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find((i) => i.id === product.id);

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
