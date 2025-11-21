import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  modelPath: string;
  photos: string[];
  cameraPos: number[];
}

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.scss',
})
export class Canvas implements AfterViewInit {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

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
      cameraPos: [0, 0, 50],
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
      cameraPos: [0, 0, 5],
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
      cameraPos: [50, 50, 200],
    },
  ];

  public id: number | null = null;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private orbitControls!: OrbitControls;
  public path: string | undefined = '';
  public wantedProduct: Product | undefined;

  ngAfterViewInit(): void {
    this.setUpScene();
    this.animate();
    this.loadModel();
  }

  constructor(private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id !== null) {
      this.wantedProduct = this.jewelry.find((j) => j.id === this.id);
    }

    this.path = this.wantedProduct?.modelPath;
  }

  private setUpScene() {
    const canvas = this.canvasRef.nativeElement;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf2f2f2);

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(devicePixelRatio);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(10, 20, 10);
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambient);

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private loadModel() {
    const loader = new GLTFLoader();

    loader.load(
      this.path || '',

      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        model.position.set(0, 0, 0);
        box.getCenter(center);

        model.position.sub(center);
        if (this.wantedProduct?.cameraPos) {
          this.camera.position.set(
            this.wantedProduct?.cameraPos[0],
            this.wantedProduct?.cameraPos[1],
            this.wantedProduct?.cameraPos[2]
          );
        }

        this.scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error);
      }
    );
  }
}
