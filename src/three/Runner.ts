import * as THREE from "three";

export default class Runner {
  group: THREE.Group;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xdddddd })
    );
    this.group.add(body);

    this.leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.7, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x3333ff })
    );
    this.rightLeg = this.leftLeg.clone();

    this.leftLeg.position.set(-0.15, -0.85, 0);
    this.rightLeg.position.set(0.15, -0.85, 0);
    this.group.add(this.leftLeg, this.rightLeg);

    this.group.position.y = 1.2;
  }

  update(time: number, scrollSpeed: number) {
    if (Math.abs(scrollSpeed) > 0.1) {
      this.leftLeg.rotation.x = Math.sin(time * 0.01) * 0.8;
      this.rightLeg.rotation.x = Math.sin(time * 0.01 + Math.PI) * 0.8;
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
    }
  }
}
