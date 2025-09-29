import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Billboard } from "./Billboard";
import { Road } from "./Road";
import { Runner } from "./Runner";
import { BILLBOARD_COUNT } from "../config";

const CameraController: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 1.2, 0); // Runner の高さに注視
  }, [camera]);
  return null;
};

export const Scene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  // スクロール管理
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 2, 6],
        fov: 60,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color(0x000000); // 黒に設定
      }}
    >
      <CameraController />
      {/* 照明 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} />

      {/* 道路 */}
      <Road scrollY={scrollY} />

      {/* 看板 */}
      {Array.from({ length: BILLBOARD_COUNT }).map((_, i) => (
        <Billboard key={i} index={i} scrollY={scrollY} />
      ))}

      {/* 仮キャラクター */}
      <Runner scrollY={scrollY} />
    </Canvas>
  );
};

export default Scene;
