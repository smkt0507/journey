import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RoadProps = {
  scrollYRef: React.RefObject<number>;
};

export const Road: React.FC<RoadProps> = ({ scrollYRef }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // CanvasTexture を一度だけ作成
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 20;
    for (let y = 0; y < 256; y += 64) {
      ctx.beginPath();
      ctx.moveTo(128, y);
      ctx.lineTo(128, y + 32);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 20);
    return tex;
  }, []);

  // scrollY に応じてオフセット更新
  useFrame(() => {
    if (meshRef.current) {
      texture.offset.y = -scrollYRef * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[5, 200]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
