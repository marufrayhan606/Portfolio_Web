"use client";

import { useEffect, useRef } from "react";

function roundedShape(THREE: typeof import("three"), width: number, height: number, radius: number) {
  const halfW = width / 2;
  const halfH = height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-halfW + radius, -halfH);
  shape.lineTo(halfW - radius, -halfH);
  shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + radius);
  shape.lineTo(halfW, halfH - radius);
  shape.quadraticCurveTo(halfW, halfH, halfW - radius, halfH);
  shape.lineTo(-halfW + radius, halfH);
  shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - radius);
  shape.lineTo(-halfW, -halfH + radius);
  shape.quadraticCurveTo(-halfW, -halfH, -halfW + radius, -halfH);
  return shape;
}

export function Hero3D() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: import("three").WebGLRenderer | undefined;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let group: import("three").Group | undefined;
    let frameActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let cleanupScene = () => {};

    import("three").then((THREE) => {
      if (!element.isConnected) return;
      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
        camera.position.set(0, 0.1, 8.1);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.className = "hero-webgl-canvas";
        element.appendChild(renderer.domElement);

        group = new THREE.Group();
        scene.add(group);
        const device = new THREE.Group();
        group.add(device);

        const caseMaterial = new THREE.MeshPhysicalMaterial({ color: 0x182132, roughness: 0.22, metalness: 0.42, clearcoat: 0.95, clearcoatRoughness: 0.15 });
        const deviceBody = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedShape(THREE, 2.02, 4.04, 0.29), { depth: 0.18, steps: 1, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.045, bevelThickness: 0.045 }), caseMaterial);
        deviceBody.position.z = -0.1;
        device.add(deviceBody);

        const screen = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedShape(THREE, 1.78, 3.78, 0.23), { depth: 0.016, bevelEnabled: false, curveSegments: 10 }), new THREE.MeshBasicMaterial({ color: 0x111a1d }));
        screen.position.z = 0.085;
        device.add(screen);

        const makePlate = (w: number, h: number, x: number, y: number, z: number, color: number, opacity = 1) => {
          const material = new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, metalness: 0.08, transparent: opacity < 1, opacity, clearcoat: 0.8 });
          const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedShape(THREE, w, h, Math.min(h * 0.18, 0.13)), { depth: 0.018, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.012, bevelThickness: 0.01 }), material);
          mesh.position.set(x, y, z);
          device.add(mesh);
          return mesh;
        };

        const text = new THREE.MeshBasicMaterial({ color: 0xeaf0ff });
        makePlate(1.42, 0.42, 0, 1.34, 0.112, 0x24473b);
        makePlate(0.64, 0.05, -0.25, 1.37, 0.146, 0xf0eadc);
        makePlate(0.3, 0.045, 0.42, 1.21, 0.146, 0xc89162);
        makePlate(1.42, 0.08, 0, 0.94, 0.112, 0x35434a);
        makePlate(1.42, 0.44, 0, 0.51, 0.112, 0x1e292d);
        makePlate(0.08, 0.24, -0.57, 0.51, 0.146, 0x83b9ff);
        makePlate(0.5, 0.045, -0.12, 0.56, 0.146, 0xe9e4d9);
        makePlate(0.79, 0.035, 0.04, 0.42, 0.146, 0x8b9698);
        makePlate(1.42, 0.44, 0, -0.12, 0.112, 0x1e292d);
        makePlate(0.08, 0.24, -0.57, -0.12, 0.146, 0xd58b66);
        makePlate(0.46, 0.045, -0.15, -0.07, 0.146, 0xe9e4d9);
        makePlate(0.85, 0.035, 0.06, -0.21, 0.146, 0x8b9698);
        makePlate(1.42, 0.44, 0, -0.75, 0.112, 0x1e292d);
        makePlate(0.08, 0.24, -0.57, -0.75, 0.146, 0x9bbf84);
        makePlate(0.55, 0.045, -0.1, -0.68, 0.146, 0xe9e4d9);
        makePlate(0.72, 0.035, 0, -0.82, 0.146, 0x8b9698);
        makePlate(0.66, 0.1, 0, -1.53, 0.115, 0x28383b);
        const cameraPill = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.055, 0.025), new THREE.MeshBasicMaterial({ color: 0x080e18 }));
        cameraPill.position.set(0, 1.82, 0.12);
        device.add(cameraPill);
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.027, 24), new THREE.MeshBasicMaterial({ color: 0x53658d }));
        lens.position.set(0.13, 1.82, 0.137);
        device.add(lens);

        const light = new THREE.DirectionalLight(0xffffff, 3.3);
        light.position.set(-3.5, 5, 7);
        scene.add(light);
        const rim = new THREE.PointLight(0x8994ff, 26, 15, 2);
        rim.position.set(3, 1, 4);
        scene.add(rim);
        scene.add(new THREE.AmbientLight(0xe3e8ff, 1.35));

        const resize = () => {
          if (!renderer) return;
          const width = element.clientWidth;
          const height = element.clientHeight;
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.position.z = width < 500 ? 9.25 : 8.1;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };
        const animate = (time: number) => {
          if (!group || !renderer) return;
          group.rotation.y += (pointerX * 0.16 + Math.sin(time * 0.00022) * 0.035 - group.rotation.y) * 0.035;
          group.rotation.x += (pointerY * 0.09 + Math.sin(time * 0.00032) * 0.018 - group.rotation.x) * 0.035;
          device.rotation.y += (Math.sin(time * 0.0003) * 0.045 - device.rotation.y) * 0.025;
          device.position.y = Math.sin(time * 0.0006) * 0.045;
          renderer.render(scene, camera);
        };
        const start = () => {
          if (frameActive || document.hidden) return;
          frameActive = true;
          renderer?.setAnimationLoop(animate);
        };
        const stop = () => {
          frameActive = false;
          renderer?.setAnimationLoop(null);
        };
        const onPointerMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };
        const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
        const onVisibility = () => document.hidden ? stop() : start();
        observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: 0.1 });
        observer.observe(element);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(element);
        element.addEventListener("pointermove", onPointerMove, { passive: true });
        element.addEventListener("pointerleave", onPointerLeave);
        document.addEventListener("visibilitychange", onVisibility);
        resize();
        element.classList.add("webgl-ready");
        cleanupScene = () => {
          stop();
          observer?.disconnect();
          resizeObserver?.disconnect();
          element.removeEventListener("pointermove", onPointerMove);
          element.removeEventListener("pointerleave", onPointerLeave);
          document.removeEventListener("visibilitychange", onVisibility);
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => material.dispose());
            }
          });
          renderer?.dispose();
          renderer?.domElement.remove();
        };
      } catch {
        renderer?.dispose();
        element.classList.add("webgl-failed");
      }
    }).catch(() => element.classList.add("webgl-failed"));

    return () => cleanupScene();
  }, []);

  return <div className="hero-3d" ref={host} aria-hidden="true">
    <div className="hero-3d-fallback"><div className="fallback-phone"><div className="fallback-speaker"/><span className="fallback-phone-label">DIU · CAMPUS</span><b>Today’s<br/>schedule</b><i/><i/><i/><span className="fallback-card"/></div></div>
  </div>;
}
