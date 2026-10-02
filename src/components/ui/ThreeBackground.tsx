import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TabType } from "../../types";

interface ThreeBackgroundProps {
  activeTab?: TabType | string;
  className?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  activeTab = "home",
  className = ""
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // 1. WebGL Feature Detection
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Accessibility & device capabilities
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // 2. Three.js Scene, Camera, Fog
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050607, 0.024);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);
    camera.position.set(0, 1.8, 28);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 3. Restrained Luxury Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6f9bff, 1.2);
    keyLight.position.set(16, 22, 18);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6ee7b7, 0.65);
    fillLight.position.set(-18, -10, 14);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8b7cff, 0.4);
    rimLight.position.set(0, 15, -12);
    scene.add(rimLight);

    // 4. Subtle Perspective Grid (Floor & Secondary Horizon)
    const gridFloor = new THREE.GridHelper(90, 45, 0x222a36, 0x0c0f13);
    gridFloor.position.y = -8.5;
    const floorMats = Array.isArray(gridFloor.material) ? gridFloor.material : [gridFloor.material];
    floorMats.forEach(m => {
      m.transparent = true;
      m.opacity = 0.2;
    });
    scene.add(gridFloor);

    const gridHorizon = new THREE.GridHelper(60, 20, 0x1a212d, 0x07090c);
    gridHorizon.position.set(0, 8, -25);
    gridHorizon.rotation.x = Math.PI / 2.5;
    const horizonMats = Array.isArray(gridHorizon.material) ? gridHorizon.material : [gridHorizon.material];
    horizonMats.forEach(m => {
      m.transparent = true;
      m.opacity = 0.08;
    });
    scene.add(gridHorizon);

    // 5. InstancedMesh Candlesticks (High Performance Single-Drawcall Architecture)
    const candleCount = isMobile ? 20 : 36;
    const candleSpacing = 1.35;
    const startX = -((candleCount - 1) * candleSpacing) / 2;

    const emeraldColor = new THREE.Color(0x6ee7b7);
    const redColor = new THREE.Color(0xff7b86);

    // Shared Geometries for instancing
    const bodyGeometry = new THREE.BoxGeometry(0.72, 1, 0.45);
    const wickGeometry = new THREE.CylinderGeometry(0.035, 0.035, 1, 6);

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.35,
      metalness: 0.25,
      transparent: true,
      opacity: 0.85
    });

    const wickMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.65
    });

    const bodyInstancedMesh = new THREE.InstancedMesh(bodyGeometry, bodyMaterial, candleCount);
    const upperWickInstancedMesh = new THREE.InstancedMesh(wickGeometry, wickMaterial, candleCount);
    const lowerWickInstancedMesh = new THREE.InstancedMesh(wickGeometry, wickMaterial, candleCount);

    scene.add(bodyInstancedMesh);
    scene.add(upperWickInstancedMesh);
    scene.add(lowerWickInstancedMesh);

    interface CandleConfig {
      x: number;
      baseY: number;
      depthZ: number;
      bodyHeight: number;
      upperWickHeight: number;
      lowerWickHeight: number;
      isBullish: boolean;
      phase: number;
      isFrontier: boolean;
    }

    const candleConfigs: CandleConfig[] = [];
    const pricePoints: THREE.Vector3[] = [];
    let runningPrice = 0;

    for (let i = 0; i < candleCount; i++) {
      const x = startX + i * candleSpacing;
      const delta = (Math.sin(i * 0.44) * 1.25 + Math.cos(i * 0.88) * 0.85) + (Math.random() - 0.48) * 0.65;
      runningPrice += delta * 0.36;

      const bodyHeight = 0.55 + Math.abs(delta) * 0.95;
      const upperWickHeight = 0.35 + Math.random() * 0.75;
      const lowerWickHeight = 0.35 + Math.random() * 0.75;
      const isBullish = delta >= 0;
      const depthZ = -2.5 + Math.sin(i * 0.38) * 2.5;
      const isFrontier = i >= candleCount - 4;

      candleConfigs.push({
        x,
        baseY: runningPrice,
        depthZ,
        bodyHeight,
        upperWickHeight,
        lowerWickHeight,
        isBullish,
        phase: i * 0.24,
        isFrontier
      });

      const color = isBullish ? emeraldColor : redColor;
      bodyInstancedMesh.setColorAt(i, color);
      upperWickInstancedMesh.setColorAt(i, color);
      lowerWickInstancedMesh.setColorAt(i, color);

      pricePoints.push(new THREE.Vector3(x, runningPrice, depthZ));
    }

    if (bodyInstancedMesh.instanceColor) bodyInstancedMesh.instanceColor.needsUpdate = true;
    if (upperWickInstancedMesh.instanceColor) upperWickInstancedMesh.instanceColor.needsUpdate = true;
    if (lowerWickInstancedMesh.instanceColor) lowerWickInstancedMesh.instanceColor.needsUpdate = true;

    // Helper matrices to apply instance transforms
    const dummy = new THREE.Object3D();

    // 6. Market Price Spline & Glowing Data Pulse Particle
    const priceCurve = new THREE.CatmullRomCurve3(pricePoints);
    const curvePoints = priceCurve.getPoints(candleCount * 5);
    const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0x6f9bff,
      transparent: true,
      opacity: 0.35
    });
    const priceLine = new THREE.Line(curveGeometry, curveMaterial);
    scene.add(priceLine);

    const pulseGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x6f9bff,
      transparent: true,
      opacity: 0.85
    });
    const pulseSphere = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseSphere);

    // 7. Ambient Financial Data Particles with Deflection
    const particleCount = isMobile ? 400 : 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 52;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 26;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 30 - 2;

      particleVelocities[idx] = (Math.random() - 0.5) * 0.006;
      particleVelocities[idx + 1] = (Math.random() - 0.5) * 0.006;
      particleVelocities[idx + 2] = (Math.random() - 0.5) * 0.006;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6f9bff,
      size: isMobile ? 0.07 : 0.085,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Subtle AI Telemetry Vector Lines
    const telemetryGeo = new THREE.BufferGeometry();
    const telemetryPositions = new Float32Array(12 * 3);
    telemetryGeo.setAttribute("position", new THREE.BufferAttribute(telemetryPositions, 3));
    const telemetryMat = new THREE.LineBasicMaterial({
      color: 0x8b7cff,
      transparent: true,
      opacity: 0.25
    });
    const telemetryLine = new THREE.LineSegments(telemetryGeo, telemetryMat);
    scene.add(telemetryLine);

    // 9. Mouse Tracking & Non-Interactive Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Section-specific camera focus
    const getCameraConfig = (tab: string) => {
      switch (tab) {
        case "charts":
          return { pos: new THREE.Vector3(0, 1.2, 23), candleScale: 1.08, pulseSpeed: 0.075 };
        case "simulator":
          return { pos: new THREE.Vector3(0, 1.8, 25), candleScale: 1.04, pulseSpeed: 0.09 };
        case "research":
          return { pos: new THREE.Vector3(2.0, 1.9, 26), candleScale: 1.0, pulseSpeed: 0.06 };
        case "learn":
          return { pos: new THREE.Vector3(0, 2.8, 29), candleScale: 0.95, pulseSpeed: 0.045 };
        case "portfolio":
          return { pos: new THREE.Vector3(-1.2, 2.2, 29), candleScale: 0.96, pulseSpeed: 0.05 };
        default:
          return { pos: new THREE.Vector3(0, 1.8, 28), candleScale: 1.0, pulseSpeed: 0.06 };
      }
    };

    let targetCameraConfig = getCameraConfig(activeTab);

    // Visibility Handling
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 10. Animation Loop with InstancedMesh Transform Updates
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible || prefersReducedMotion) {
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      camera.position.x += (targetCameraConfig.pos.x + mouse.x * 1.4 - camera.position.x) * 0.038;
      camera.position.y += (targetCameraConfig.pos.y + mouse.y * 1.1 - camera.position.y) * 0.038;
      camera.position.z += (targetCameraConfig.pos.z - camera.position.z) * 0.038;
      camera.lookAt(0, 0, 0);

      // Raycast to interaction plane for physical particle deflection
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(interactionPlane, mouse3D);

      // Update InstancedMesh matrices for breathing motion & cursor proximity
      for (let i = 0; i < candleCount; i++) {
        const c = candleConfigs[i];

        const wave = c.isFrontier
          ? Math.sin(elapsedTime * 1.15 + c.phase) * 0.16
          : Math.sin(elapsedTime * 0.48 + c.phase) * 0.07;

        const currentY = c.baseY + wave;
        const distToMouse = Math.hypot(c.x - mouse3D.x, currentY - mouse3D.y);

        let hoverScale = 1.0;
        if (distToMouse < 3.0) {
          const influence = (3.0 - distToMouse) / 3.0;
          hoverScale += influence * 0.04;
        }

        const effectiveScale = targetCameraConfig.candleScale * hoverScale;

        // 1. Body Instance Transform
        dummy.position.set(c.x, currentY, c.depthZ);
        dummy.scale.set(effectiveScale, c.bodyHeight * effectiveScale, effectiveScale);
        dummy.updateMatrix();
        bodyInstancedMesh.setMatrixAt(i, dummy.matrix);

        // 2. Upper Wick Instance Transform
        dummy.position.set(c.x, currentY + (c.bodyHeight / 2 + c.upperWickHeight / 2) * effectiveScale, c.depthZ);
        dummy.scale.set(effectiveScale, c.upperWickHeight * effectiveScale, effectiveScale);
        dummy.updateMatrix();
        upperWickInstancedMesh.setMatrixAt(i, dummy.matrix);

        // 3. Lower Wick Instance Transform
        dummy.position.set(c.x, currentY - (c.bodyHeight / 2 + c.lowerWickHeight / 2) * effectiveScale, c.depthZ);
        dummy.scale.set(effectiveScale, c.lowerWickHeight * effectiveScale, effectiveScale);
        dummy.updateMatrix();
        lowerWickInstancedMesh.setMatrixAt(i, dummy.matrix);
      }

      bodyInstancedMesh.instanceMatrix.needsUpdate = true;
      upperWickInstancedMesh.instanceMatrix.needsUpdate = true;
      lowerWickInstancedMesh.instanceMatrix.needsUpdate = true;

      // Animate Price Line Data Pulse
      const pulseT = (elapsedTime * targetCameraConfig.pulseSpeed) % 1;
      const pointOnCurve = priceCurve.getPointAt(pulseT);
      pulseSphere.position.copy(pointOnCurve);

      // Animate Data Particles with deflection
      const positionsAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const pArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pArray[idx] += particleVelocities[idx];
        pArray[idx + 1] += particleVelocities[idx + 1];
        pArray[idx + 2] += particleVelocities[idx + 2];

        // Soft cursor deflection
        const pX = pArray[idx];
        const pY = pArray[idx + 1];
        const dist = Math.hypot(pX - mouse3D.x, pY - mouse3D.y);
        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.014;
          pArray[idx] += (pX - mouse3D.x) * force;
          pArray[idx + 1] += (pY - mouse3D.y) * force;
        }

        // Boundary wrapping
        if (pArray[idx] > 26) pArray[idx] = -26;
        if (pArray[idx] < -26) pArray[idx] = 26;
        if (pArray[idx + 1] > 13) pArray[idx + 1] = -13;
        if (pArray[idx + 1] < -13) pArray[idx + 1] = 13;
      }
      positionsAttr.needsUpdate = true;

      // Animate Periodic AI Telemetry Line Pulses
      if (Math.floor(elapsedTime * 2) % 4 === 0) {
        const c1 = candleConfigs[Math.floor(elapsedTime * 2.5) % candleConfigs.length];
        const c2 = candleConfigs[(Math.floor(elapsedTime * 2.5) + 3) % candleConfigs.length];
        if (c1 && c2) {
          const tArr = (telemetryGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
          tArr[0] = c1.x; tArr[1] = c1.baseY; tArr[2] = c1.depthZ;
          tArr[3] = c2.x; tArr[4] = c2.baseY; tArr[5] = c2.depthZ;
          (telemetryGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
          telemetryMat.opacity = 0.3 + Math.sin(elapsedTime * 4) * 0.12;
        }
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 11. Clean-up Lifecycle Methods
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Dispose Geometries
      bodyGeometry.dispose();
      wickGeometry.dispose();
      curveGeometry.dispose();
      pulseGeo.dispose();
      particleGeo.dispose();
      telemetryGeo.dispose();

      // Dispose Materials
      bodyMaterial.dispose();
      wickMaterial.dispose();
      curveMaterial.dispose();
      pulseMat.dispose();
      particleMat.dispose();
      telemetryMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {!webGLSupported && (
        <div className="absolute inset-0 ambient-grid opacity-30 dark:opacity-20" />
      )}
    </div>
  );
};
