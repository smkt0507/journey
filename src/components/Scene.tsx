import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Road from "../three/Road";
import Billboard from "../three/Billboard";
import Runner from "../three/Runner";
import { BILLBOARD_COUNT, BILLBOARD_SPACING, SCROLL_FACTOR } from "../config";

const Scene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const road = new Road();
    scene.add(road.mesh);

    const billboards: Billboard[] = [];
    for (let i = 0; i < BILLBOARD_COUNT; i++) {
      const b = new Billboard(i);
      scene.add(b.group);
      billboards.push(b);
    }

    const runner = new Runner();
    scene.add(runner.group);

    let lastScrollY = window.scrollY;

    const animate = (time: number) => {
      requestAnimationFrame(animate);

      const currentScrollY = window.scrollY;
      const scrollSpeed = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // 看板
      billboards.forEach((b, i) => {
        const z = -i * BILLBOARD_SPACING + currentScrollY * SCROLL_FACTOR;
        b.group.position.z = z;
        if (z > 5) b.group.position.z = BILLBOARD_SPACING * -10;
      });

      // 道路
      road.update(currentScrollY);

      // 足アニメーション
      runner.update(time, scrollSpeed);

      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }} />;
};

export default Scene;
