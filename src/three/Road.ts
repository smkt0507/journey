import * as THREE from "three";

export default class Road {
  mesh: THREE.Mesh;
  texture: THREE.CanvasTexture;

  constructor() {
    const roadWidth = 5;
    const roadCanvas = document.createElement("canvas");
    roadCanvas.width = 256;
    roadCanvas.height = 256;
    const ctx = roadCanvas.getContext("2d")!;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 20;
    for (let y = 0; y < 256; y += 64) {
      ctx.beginPath();
      ctx.moveTo(128, y);
      ctx.lineTo(128, y + 32);
      ctx.stroke();
    }

    this.texture = new THREE.CanvasTexture(roadCanvas);
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(1, 20);

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(roadWidth, 200),
      new THREE.MeshStandardMaterial({ map: this.texture })
    );
    this.mesh.rotation.x = -Math.PI / 2;
  }

  update(scrollY: number) {
    this.texture.offset.y = -scrollY * 0.02;
  }
}
