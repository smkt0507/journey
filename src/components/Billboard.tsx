import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BILLBOARD_SPACING } from "../config";

type BillboardProps = {
  index: number;
  scrollYRef: React.RefObject<number>;
};

export const Billboard: React.FC<BillboardProps> = ({ index, scrollYRef }) => {
  const groupRef = useRef<THREE.Group>(null);

  const boardWidth = 3;
  const boardHeight = 2;
  const poleHeight = 4;

  // 初期色を生成
  const color = useMemo(
    () => new THREE.Color().setHSL(Math.random(), 0.6, 0.5),
    []
  );

  useFrame(() => {
    if (groupRef.current) {
      let z = -index * BILLBOARD_SPACING + scrollYRef.current * 0.05; // SCROLL_FACTOR
      if (z > 5) z = -BILLBOARD_SPACING * 10; // リセット
      groupRef.current.position.z = z;
    }
  });

  return (
    <group
      ref={groupRef}
      position-x={5 / 2 - boardWidth / 2 - 0.1}
      position-y={0}
    >
      {/* 看板本体 */}
      <mesh position-y={3}>
        <planeGeometry args={[boardWidth, boardHeight]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* 支柱 */}
      <mesh position-x={boardWidth / 2} position-y={poleHeight / 2}>
        <cylinderGeometry args={[0.05, 0.05, poleHeight, 8]} />
        <meshStandardMaterial color={0x888888} />
      </mesh>
    </group>
  );
};
