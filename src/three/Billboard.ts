import * as THREE from "three";
import { BILLBOARD_SPACING } from "../config";

export default class Billboard {
  group: THREE.Group;

  constructor(index: number) {
    this.group = new THREE.Group();

    const boardWidth = 3;
    const boardHeight = 2;

    const boardGeometry = new THREE.PlaneGeometry(boardWidth, boardHeight);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.6, 0.5),
      side: THREE.DoubleSide,
    });
    const board = new THREE.Mesh(boardGeometry, mat);
    board.position.y = 3;
    this.group.add(board);

    const poleHeight = 3;
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, poleHeight, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(boardWidth / 2, poleHeight / 2, 0);
    this.group.add(pole);

    this.group.position.x = 5 / 2 - boardWidth / 2 - 0.1; // 道路幅 = 5
    this.group.position.z = -index * BILLBOARD_SPACING;
  }
}
