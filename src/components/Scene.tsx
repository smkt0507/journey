import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Runner } from "./Runner";
import { Billboard } from "./Billboard";
import { Road } from "./Road";
import { BILLBOARD_COUNT } from "../config";

const CameraController: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 1.6, 0); // Runner の高さに注視
  }, [camera]);
  return null;
};

export const Scene: React.FC = () => {
  // scrollY の ref を作る
  const scrollYRef = useRef<number>(0);

  // スクロール監視
  React.useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const billboardIndices = useMemo(
    () => Array.from({ length: BILLBOARD_COUNT }, (_, i) => i),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 60 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color(0x000000); // 黒に設定
      }}
    >
      <CameraController />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} />

      <Road scrollYRef={scrollYRef} />

      {billboardIndices.map((i) => (
        <Billboard key={i} index={i} scrollYRef={scrollYRef} />
      ))}

      <Runner scrollYRef={scrollYRef} />
    </Canvas>
  );
};
