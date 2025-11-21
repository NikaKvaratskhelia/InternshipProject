import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  modelPath: string;
  photos: string[];
}

@Component({
  selector: 'app-main',
  imports: [RouterModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  public jewelry: Product[] = [
    {
      id: 1,
      name: 'Black Standart Ring',
      description:
        'Minimalist black-coated ring designed for everyday wear. Clean, modern, and built to complement any style without trying too hard.',
      price: 24,
      modelPath: 'Assets/Models/basicRing.glb',
      photos: ['Assets/images/blackRing.webp','Assets/images/blackRing1.webp','Assets/images/blackRing2.webp'],
    },
    {
      id: 2,
      name: 'Magic Ring',
      description:
        'A standout ring featuring detailed engravings and gemstone highlights. Crafted to look mystical without feeling cheap or gimmicky.',
      price: 147,
      modelPath: 'Assets/Models/magic_ring.glb',
      photos: ['Assets/images/magicRing.webp','Assets/images/magicRing2.webp','Assets/images/magicRing3.webp'],
    },
    {
      id: 3,
      name: 'Pearl Necklace',
      description:
        'Elegant freshwater-style pearls arranged in a classic strand. Soft shine, timeless look, and perfect for elevating any outfit.',
      price: 85,
      modelPath: 'Assets/Models/pearlNecklace.glb',
      photos: ['Assets/images/pearlNecklace.webp','Assets/images/pearlNecklace1.webp','Assets/images/pearlNecklace2.webp'],
    },
  ];
}
