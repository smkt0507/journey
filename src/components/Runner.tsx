import { useRef } from "react";
import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Runner: React.FC<{ scrollY: number }> = ({ scrollY }) => {
  const lastScrollY = useRef(0); // 前フレームの scrollY を保持
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 1000;
    const scrollSpeed = scrollY - lastScrollY.current; // 前フレームとの差分
    lastScrollY.current = scrollY; // 今回のスクロールを次フレーム用に保存

    if (Math.abs(scrollSpeed) > 0.1) {
      leftLegRef.current!.rotation.x = Math.sin(time * 0.01) * 0.8;
      rightLegRef.current!.rotation.x = Math.sin(time * 0.01 + Math.PI) * 0.8;
    } else {
      leftLegRef.current!.rotation.x = 0;
      rightLegRef.current!.rotation.x = 0;
    }
  });

  return (
    <group position-y={1.2}>
      <mesh>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial color={0xdddddd} />
      </mesh>

      <mesh ref={leftLegRef} position={[-0.15, -0.85, 0]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color={0x3333ff} />
      </mesh>

      <mesh ref={rightLegRef} position={[0.15, -0.85, 0]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color={0x3333ff} />
      </mesh>
    </group>
  );
};
