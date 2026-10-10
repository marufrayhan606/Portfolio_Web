"use client";

import { useEffect, useRef } from "react";

function createRoundedShape(THREE: typeof import("three"), width: number, height: number, radius: number) {
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
    let mainGroup: import("three").Group | undefined;
    let ringsGroup: import("three").Group | undefined;
    let particlesMesh: import("three").Points | undefined;
    let satellitesGroup: import("three").Group | undefined;
    let deviceGroup: import("three").Group | undefined;
    let frameActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let scrollYOffset = 0;
    let cleanupScene = () => {};

    import("three")
      .then((THREE) => {
        if (!element.isConnected) return;
        try {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
          camera.position.set(0, 0, 7.5);

          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setClearColor(0x000000, 0);
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.domElement.setAttribute("aria-hidden", "true");
          renderer.domElement.className = "hero-webgl-canvas";
          element.appendChild(renderer.domElement);

          mainGroup = new THREE.Group();
          scene.add(mainGroup);

          // 1. Device Group (Android Glass Flagship)
          deviceGroup = new THREE.Group();
          mainGroup.add(deviceGroup);

          // Body frame - dark obsidian with frosted emerald reflection
          const chassisMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x091018,
            metalness: 0.85,
            roughness: 0.18,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            reflectivity: 0.9,
          });

          const chassisGeom = new THREE.ExtrudeGeometry(createRoundedShape(THREE, 1.95, 3.9, 0.32), {
            depth: 0.14,
            steps: 1,
            bevelEnabled: true,
            bevelSegments: 5,
            bevelSize: 0.04,
            bevelThickness: 0.04,
          });
          const chassis = new THREE.Mesh(chassisGeom, chassisMaterial);
          chassis.position.z = -0.07;
          deviceGroup.add(chassis);

          // Screen glass (Frosted AMOLED with cyber gradient)
          const screenGeom = new THREE.ExtrudeGeometry(createRoundedShape(THREE, 1.82, 3.74, 0.26), {
            depth: 0.02,
            bevelEnabled: false,
          });
          const screenMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x050c14,
            roughness: 0.12,
            metalness: 0.2,
            transmission: 0.3,
            ior: 1.5,
          });
          const screen = new THREE.Mesh(screenGeom, screenMaterial);
          screen.position.z = 0.08;
          deviceGroup.add(screen);

          // Screen UI Components (Floating Holographic Glass Widgets)
          const createUIPlate = (
            w: number,
            h: number,
            x: number,
            y: number,
            z: number,
            color: number,
            roughness = 0.2,
            metalness = 0.4
          ) => {
            const geom = new THREE.ExtrudeGeometry(createRoundedShape(THREE, w, h, Math.min(h * 0.2, 0.08)), {
              depth: 0.025,
              bevelEnabled: true,
              bevelSegments: 2,
              bevelSize: 0.01,
              bevelThickness: 0.01,
            });
            const mat = new THREE.MeshPhysicalMaterial({
              color,
              roughness,
              metalness,
              clearcoat: 0.8,
            });
            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(x, y, z);
            deviceGroup?.add(mesh);
            return mesh;
          };

          // Header Bar
          createUIPlate(1.5, 0.38, 0, 1.4, 0.11, 0x0f2a24, 0.3, 0.6); // Emerald Header
          createUIPlate(0.5, 0.06, -0.4, 1.42, 0.14, 0x10b981); // Emerald Pill
          createUIPlate(0.3, 0.05, 0.45, 1.42, 0.14, 0x06b6d4); // Cyan Pill

          // Neural ML Card (Sentinel widget)
          createUIPlate(1.5, 0.6, 0, 0.8, 0.11, 0x111c2e, 0.2, 0.5);
          createUIPlate(0.12, 0.4, -0.6, 0.8, 0.14, 0x8b5cf6); // Violet ML accent bar
          createUIPlate(0.65, 0.06, -0.15, 0.92, 0.14, 0x00f59b); // Active status
          createUIPlate(0.9, 0.04, -0.05, 0.8, 0.14, 0x64748b);
          createUIPlate(0.75, 0.04, -0.12, 0.68, 0.14, 0x38bdf8);

          // DIU Campus Schedule Widget
          createUIPlate(1.5, 0.65, 0, 0.05, 0.11, 0x0e1b24, 0.25, 0.4);
          createUIPlate(0.12, 0.45, -0.6, 0.05, 0.14, 0x06b6d4); // Cyan accent bar
          createUIPlate(0.7, 0.06, -0.1, 0.18, 0.14, 0xf1f5f9);
          createUIPlate(0.85, 0.04, -0.05, 0.05, 0.14, 0x94a3b8);
          createUIPlate(0.55, 0.04, -0.2, -0.08, 0.14, 0x10b981);

          // Mars Exploration Telemetry Widget
          createUIPlate(1.5, 0.55, 0, -0.68, 0.11, 0x1c1322, 0.3, 0.5);
          createUIPlate(0.12, 0.35, -0.6, -0.68, 0.14, 0xf59e0b); // Amber accent bar
          createUIPlate(0.6, 0.05, -0.15, -0.6, 0.14, 0xfbbf24);
          createUIPlate(0.8, 0.04, -0.05, -0.72, 0.14, 0xa855f7);

          // Bottom Navigation Dock
          createUIPlate(0.8, 0.12, 0, -1.5, 0.11, 0x1e293b, 0.1, 0.8);

          // Front Camera Punch-hole Pill
          const cameraPillGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 16);
          const cameraMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
          const cameraPill = new THREE.Mesh(cameraPillGeom, cameraMat);
          cameraPill.rotation.z = Math.PI / 2;
          cameraPill.position.set(0, 1.76, 0.12);
          deviceGroup.add(cameraPill);

          // 2. Gyroscopic Holographic Orbital Rings
          ringsGroup = new THREE.Group();
          mainGroup.add(ringsGroup);

          const createHoloRing = (radius: number, tube: number, color: number, tiltX: number, tiltY: number) => {
            const ringGeom = new THREE.TorusGeometry(radius, tube, 16, 80);
            const ringMat = new THREE.MeshBasicMaterial({
              color,
              wireframe: true,
              transparent: true,
              opacity: 0.35,
            });
            const ringMesh = new THREE.Mesh(ringGeom, ringMat);
            ringMesh.rotation.x = tiltX;
            ringMesh.rotation.y = tiltY;
            ringsGroup?.add(ringMesh);
            return ringMesh;
          };

          const ring1 = createHoloRing(2.6, 0.012, 0x00f59b, Math.PI / 3, Math.PI / 6);
          const ring2 = createHoloRing(2.9, 0.01, 0x06b6d4, -Math.PI / 4, Math.PI / 4);
          const ring3 = createHoloRing(3.2, 0.008, 0x8b5cf6, Math.PI / 6, -Math.PI / 3);

          // 3. Orbiting Data Satellites / Nodes
          satellitesGroup = new THREE.Group();
          mainGroup.add(satellitesGroup);

          const satColors = [0x00f59b, 0x06b6d4, 0x8b5cf6, 0xf59e0b];
          const satellites: { mesh: import("three").Mesh; orbitRadius: number; speed: number; angle: number; y: number }[] = [];

          for (let i = 0; i < 6; i++) {
            const satGeom = new THREE.IcosahedronGeometry(0.09, 1);
            const satMat = new THREE.MeshStandardMaterial({
              color: satColors[i % satColors.length],
              emissive: satColors[i % satColors.length],
              emissiveIntensity: 0.6,
              roughness: 0.2,
              metalness: 0.8,
            });
            const satMesh = new THREE.Mesh(satGeom, satMat);
            const orbitRadius = 2.4 + (i % 3) * 0.45;
            const angle = (i * Math.PI) / 3;
            const y = (i - 2.5) * 0.6;
            satellites.push({
              mesh: satMesh,
              orbitRadius,
              speed: 0.008 * (i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.2),
              angle,
              y,
            });
            satellitesGroup.add(satMesh);
          }

          // 4. Dynamic Particle Nebula (200 particles)
          const particleCount = 220;
          const particlePositions = new Float32Array(particleCount * 3);
          const particleColors = new Float32Array(particleCount * 3);

          const colorPalette = [
            new THREE.Color(0x00f59b),
            new THREE.Color(0x06b6d4),
            new THREE.Color(0x8b5cf6),
            new THREE.Color(0x38bdf8),
          ];

          for (let i = 0; i < particleCount; i++) {
            const r = 2.0 + Math.random() * 2.8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            particlePositions[i * 3 + 2] = r * Math.cos(phi) * 0.6;

            const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            particleColors[i * 3] = c.r;
            particleColors[i * 3 + 1] = c.g;
            particleColors[i * 3 + 2] = c.b;
          }

          const particleGeom = new THREE.BufferGeometry();
          particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
          particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

          const particleMat = new THREE.PointsMaterial({
            size: 0.045,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
          });

          particlesMesh = new THREE.Points(particleGeom, particleMat);
          mainGroup.add(particlesMesh);

          // 5. Lights (Cyber 2026 Lighting Setup)
          const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
          keyLight.position.set(-4, 5, 6);
          scene.add(keyLight);

          const cyanFill = new THREE.PointLight(0x06b6d4, 28, 12, 1.8);
          cyanFill.position.set(-3, -2, 3);
          scene.add(cyanFill);

          const emeraldRim = new THREE.PointLight(0x00f59b, 24, 12, 1.8);
          emeraldRim.position.set(3, 2, 3.5);
          scene.add(emeraldRim);

          const violetBack = new THREE.PointLight(0x8b5cf6, 30, 15, 2);
          violetBack.position.set(0, 3, -3);
          scene.add(violetBack);

          scene.add(new THREE.AmbientLight(0x0f172a, 1.6));

          // Responsive sizing
          const resize = () => {
            if (!renderer) return;
            const width = element.clientWidth;
            const height = element.clientHeight;
            if (!width || !height) return;
            camera.aspect = width / height;
            camera.position.z = width < 500 ? 9.2 : width < 800 ? 8.2 : 7.2;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
          };

          // Scroll Tracker
          const onScroll = () => {
            const scroll = window.scrollY;
            scrollYOffset = Math.min(scroll * 0.0012, 1.2);
          };
          window.addEventListener("scroll", onScroll, { passive: true });

          // Animation loop
          const animate = (time: number) => {
            if (!mainGroup || !renderer || !deviceGroup) return;

            // Smooth pointer easing
            pointerX += (targetPointerX - pointerX) * 0.05;
            pointerY += (targetPointerY - pointerY) * 0.05;

            // Idle floating oscillation
            const t = time * 0.001;
            const floatY = Math.sin(t * 1.2) * 0.08;
            const floatRot = Math.sin(t * 0.8) * 0.04;

            // Main group rotation reacting to cursor & scroll
            mainGroup.rotation.y = pointerX * 0.45 + Math.sin(t * 0.4) * 0.08;
            mainGroup.rotation.x = -pointerY * 0.35 + scrollYOffset * 0.4;
            mainGroup.position.y = floatY - scrollYOffset * 0.8;

            // Device subtle counter-rotation
            deviceGroup.rotation.z = floatRot + pointerX * 0.1;
            deviceGroup.rotation.y = Math.sin(t * 0.6) * 0.05;

            // Rings continuous rotation
            if (ringsGroup) {
              ring1.rotation.z += 0.003;
              ring2.rotation.z -= 0.0025;
              ring3.rotation.y += 0.002;
            }

            // Satellites orbiting
            satellites.forEach((sat) => {
              sat.angle += sat.speed;
              sat.mesh.position.x = Math.cos(sat.angle) * sat.orbitRadius;
              sat.mesh.position.z = Math.sin(sat.angle) * sat.orbitRadius;
              sat.mesh.position.y = sat.y + Math.sin(t * 2 + sat.angle) * 0.1;
              sat.mesh.rotation.x += 0.02;
              sat.mesh.rotation.y += 0.02;
            });

            // Particles rotation
            if (particlesMesh) {
              particlesMesh.rotation.y = t * 0.03;
              particlesMesh.rotation.x = Math.sin(t * 0.02) * 0.1;
            }

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
            targetPointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            targetPointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
          };

          const onPointerLeave = () => {
            targetPointerX = 0;
            targetPointerY = 0;
          };

          const onVisibility = () => (document.hidden ? stop() : start());

          observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
            threshold: 0.1,
          });
          observer.observe(element);

          resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(element);

          window.addEventListener("pointermove", onPointerMove, { passive: true });
          element.addEventListener("pointerleave", onPointerLeave);
          document.addEventListener("visibilitychange", onVisibility);

          resize();
          element.classList.add("webgl-ready");

          cleanupScene = () => {
            stop();
            observer?.disconnect();
            resizeObserver?.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("scroll", onScroll);
            element.removeEventListener("pointerleave", onPointerLeave);
            document.removeEventListener("visibilitychange", onVisibility);

            scene.traverse((object) => {
              if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
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
      })
      .catch(() => element.classList.add("webgl-failed"));

    return () => cleanupScene();
  }, []);

  return (
    <div className="hero-3d" ref={host} aria-hidden="true">
      {/* 2026 Modern Fallback Glass Frame in case WebGL is unavailable */}
      <div className="hero-3d-fallback">
        <div className="glass-phone-fallback">
          <div className="phone-lens-notch" />
          <div className="phone-glass-widget widget-status">
            <span className="widget-dot green" />
            <span>SENTINEL · ON-DEVICE ML</span>
          </div>
          <div className="phone-glass-widget widget-headline">
            <b>DIU Campus Schedule</b>
            <p>Today&apos;s routine & exam timeline</p>
          </div>
          <div className="phone-glass-widget widget-stats">
            <span>3.93 GPA</span>
            <span>8+ Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
