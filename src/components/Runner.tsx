// RunnerFiber.tsx
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RunnerFiberProps {
  scrollYRef: React.RefObject<number>;
}

export const Runner: React.FC<RunnerFiberProps> = ({ scrollYRef }) => {
  const gltf = useGLTF("/models/character.glb");
  const modelRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const lastScrollY = useRef(scrollYRef.current || 0);

  useEffect(() => {
    if (modelRef.current && gltf.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(modelRef.current);
      gltf.animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play(); // とりあえず全クリップ再生してみる
      });
    }
  }, [gltf]);

  useFrame((state, delta) => {
    const currentScrollY = scrollYRef.current || 0;
    const scrollSpeed = currentScrollY - lastScrollY.current;

    // AnimationMixer 更新
    if (mixerRef.current) {
      // スクロール速度で足アニメーションを ON/OFF
      mixerRef.current.timeScale = Math.abs(scrollSpeed) > 0.1 ? 1 : 0;
      mixerRef.current.update(delta);
    }

    // キャラクター位置は固定（Z軸）
    if (modelRef.current) {
      modelRef.current.position.z = 0; // 道路上に固定
    }

    lastScrollY.current = currentScrollY;
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

useGLTF.preload("/models/character.glb");
