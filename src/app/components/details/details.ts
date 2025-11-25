import { Component, ViewChild } from '@angular/core';
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
  availableColors?: any;
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
      availableColors: [
        {
          default: 'Assets/Models/magic_ring.glb',
          color: 'Default',
        },
        {
          red: 'Assets/Models/redRing.glb',
          color: 'Red',
        },
        {
          green: 'Assets/Models/greenRing.glb',
          color: 'Green',
        },
        {
          blue: 'Assets/Models/blueRing.glb',
          color: 'Blue',
        },
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

  @ViewChild(Canvas) canvas!: Canvas;

  public wantedColor: string = 'Default';
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

  nextIndex: number | null = null;
  direction: 'left' | 'right' | null = null;

  get length() {
    return this.wantedProduct?.photos?.length || 0;
  }

  go(direction: 'left' | 'right') {
    if (this.nextIndex !== null) return; 

    const newIndex =
      direction === 'right'
        ? (this.currentIndex + 1) % this.length
        : (this.currentIndex - 1 + this.length) % this.length;

    this.nextIndex = newIndex;
    this.direction = direction;
  }

  onAnimationEnd() {
    if (this.nextIndex === null) return;

    this.currentIndex = this.nextIndex;
    this.nextIndex = null;
    this.direction = null;
  }

  next() {
    this.go('right');
  }

  prev() {
    this.go('left');
  }

  changeModel(color: string) {
    this.wantedColor = color;

    this.canvas.setUpPath(this.wantedColor.toLowerCase());
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
