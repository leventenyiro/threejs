import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  worker?: Worker;
  canvas?: OffscreenCanvas;

  constructor() { }

  ngOnInit() {
    this.canvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
  }

  ngAfterViewInit() {
    // Connect to the worker
    this.worker = new Worker(new URL('src/app/_workers/threejs.worker.ts', import.meta.url));
  
    const htmlCanvas = document.getElementById('canvas') as any;
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
  
    const hasOffscreenSupport = !!htmlCanvas.transferControlToOffscreen;
    if (hasOffscreenSupport) {
      const offscreen = htmlCanvas.transferControlToOffscreen() as any;
  
      // Load the texture in the main thread
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('../assets/earth-texture.jpg', (texture: any) => {
        createImageBitmap(texture.image).then((imageBitmap) => {
          // Send canvas offscreen and ImageBitmap to the worker
          this.worker?.postMessage({ canvas: offscreen, textureBitmap: imageBitmap }, [offscreen, imageBitmap]);
        });
      });
  
      // Event handling and sending to the worker
      htmlCanvas.addEventListener('mousemove', (event: any) => {
        if (this.worker) {
          this.worker.postMessage({
            type: 'mousemove',
            mouseX: event.clientX,
            mouseY: event.clientY
          });
        }
      });
    }
  }
}
