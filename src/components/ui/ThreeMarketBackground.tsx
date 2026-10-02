import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TabType } from "../../types";

interface ThreeMarketBackgroundProps {
  activeTab?: TabType;
}

export const ThreeMarketBackground: React.FC<ThreeMarketBackgroundProps> = ({
  activeTab = "home"
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // 1. WebGL Safety Check
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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // 2. Three.js Scene, Camera, Renderer Setup
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050607, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 600);
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
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 3. Lighting Setup (Restrained Luxury Palette)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x6f9bff, 1.3);
    keyLight.position.set(15, 22, 20);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6ee7b7, 0.7);
    fillLight.position.set(-18, -10, 14);
    scene.add(fillLight);

    // 4. Subtle 3D Financial Grid Floor
    const gridHelper = new THREE.GridHelper(100, 50, 0x1e242c, 0x0c0f13);
    gridHelper.position.y = -9;
    const gridMaterials = Array.isArray(gridHelper.material) ? gridHelper.material : [gridHelper.material];
    gridMaterials.forEach(mat => {
      mat.transparent = true;
      mat.opacity = 0.22;
    });
    scene.add(gridHelper);

    // 5. Multi-Depth Candlestick Formations (Foreground, Midground, Background)
    const candlesGroup = new THREE.Group();
    scene.add(candlesGroup);

    interface CandleItem {
      group: THREE.Group;
      bodyMesh: THREE.Mesh;
      upperWickMesh: THREE.Mesh;
      lowerWickMesh: THREE.Mesh;
      baseY: number;
      baseScaleY: number;
      phase: number;
      isBullish: boolean;
      bodyMaterial: THREE.MeshStandardMaterial;
      wickMaterial: THREE.MeshBasicMaterial;
      isFrontier: boolean;
    }

    const candleItems: CandleItem[] = [];
    const candleCount = isMobile ? 16 : 32;
    const candleSpacing = 1.4;
    const startX = -((candleCount - 1) * candleSpacing) / 2;

    const emeraldColor = new THREE.Color(0x6ee7b7);
    const emeraldEmissive = new THREE.Color(0x10b981);
    const redColor = new THREE.Color(0xff7b86);
    const redEmissive = new THREE.Color(0xe11d48);

    const pricePoints: THREE.Vector3[] = [];

    // Shared geometries for performance
    const bodyGeometry = new THREE.BoxGeometry(0.72, 1, 0.5);
    const wickGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1, 6);

    let runningPrice = 0;

    for (let i = 0; i < candleCount; i++) {
      const x = startX + i * candleSpacing;
      // Organic price walk
      const delta = (Math.sin(i * 0.42) * 1.3 + Math.cos(i * 0.85) * 0.9) + (Math.random() - 0.48) * 0.7;
      runningPrice += delta * 0.38;

      const bodyHeight = 0.6 + Math.abs(delta) * 0.9;
      const upperWickHeight = 0.4 + Math.random() * 0.8;
      const lowerWickHeight = 0.4 + Math.random() * 0.8;
      const isBullish = delta >= 0;
      const depthZ = -2 + Math.sin(i * 0.35) * 2.2;
      const isFrontier = i >= candleCount - 4; // Active trading frontier

      const candleGroup = new THREE.Group();
      candleGroup.position.set(x, runningPrice, depthZ);

      // Body Material
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: isBullish ? emeraldColor : redColor,
        emissive: isBullish ? emeraldEmissive : redEmissive,
        emissiveIntensity: 0.12,
        roughness: 0.38,
        metalness: 0.22,
        transparent: true,
        opacity: 0.82
      });

      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyMesh.scale.set(1, bodyHeight, 1);
      candleGroup.add(bodyMesh);

      // Wick Material
      const wickMaterial = new THREE.MeshBasicMaterial({
        color: isBullish ? emeraldColor : redColor,
        transparent: true,
        opacity: 0.65
      });

      // Upper Wick
      const upperWickMesh = new THREE.Mesh(wickGeometry, wickMaterial);
      upperWickMesh.scale.set(1, upperWickHeight, 1);
      upperWickMesh.position.y = bodyHeight / 2 + upperWickHeight / 2;
      candleGroup.add(upperWickMesh);

      // Lower Wick
      const lowerWickMesh = new THREE.Mesh(wickGeometry, wickMaterial);
      lowerWickMesh.scale.set(1, lowerWickHeight, 1);
      lowerWickMesh.position.y = -(bodyHeight / 2 + lowerWickHeight / 2);
      candleGroup.add(lowerWickMesh);

      candlesGroup.add(candleGroup);

      candleItems.push({
        group: candleGroup,
        bodyMesh,
        upperWickMesh,
        lowerWickMesh,
        baseY: runningPrice,
        baseScaleY: bodyHeight,
        phase: i * 0.22,
        isBullish,
        bodyMaterial,
        wickMaterial,
        isFrontier
      });

      pricePoints.push(new THREE.Vector3(x, runningPrice, depthZ));
    }

    // 6. Market Price Spline & Glowing Pulse Particle
    const priceCurve = new THREE.CatmullRomCurve3(pricePoints);
    const curvePoints = priceCurve.getPoints(candleCount * 5);
    const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0x6f9bff,
      transparent: true,
      opacity: 0.36
    });
    const priceLine = new THREE.Line(curveGeometry, curveMaterial);
    scene.add(priceLine);

    // Glowing Pulse Sphere
    const pulseGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x6f9bff,
      transparent: true,
      opacity: 0.88
    });
    const pulseSphere = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseSphere);

    // 7. Ambient Financial Data Particles (Physical Deflection)
    const particleCount = isMobile ? 500 : 1800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 55;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 26;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 32 - 2;

      particleVelocities[idx] = (Math.random() - 0.5) * 0.007;
      particleVelocities[idx + 1] = (Math.random() - 0.5) * 0.007;
      particleVelocities[idx + 2] = (Math.random() - 0.5) * 0.007;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6f9bff,
      size: isMobile ? 0.08 : 0.09,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. AI Market Telemetry Connection Line Segments
    const telemetryGroup = new THREE.Group();
    scene.add(telemetryGroup);

    const telemetryGeo = new THREE.BufferGeometry();
    const telemetryPositions = new Float32Array(12 * 3);
    telemetryGeo.setAttribute("position", new THREE.BufferAttribute(telemetryPositions, 3));
    const telemetryMat = new THREE.LineBasicMaterial({
      color: 0x8b7cff,
      transparent: true,
      opacity: 0.28
    });
    const telemetryLine = new THREE.LineSegments(telemetryGeo, telemetryMat);
    telemetryGroup.add(telemetryLine);

    // 9. Mouse Coordinates and Parallax Target
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouse3D = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (window.__stockMentorPointer) {
        window.__stockMentorPointer.normalizedX = mouse.targetX;
        window.__stockMentorPointer.normalizedY = mouse.targetY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Section camera target positions
    const getSectionCameraConfig = (tab: string) => {
      switch (tab) {
        case "charts":
          return { pos: new THREE.Vector3(0, 1.2, 23), candleScale: 1.1, pulseSpeed: 0.08 };
        case "simulator":
          return { pos: new THREE.Vector3(0, 1.8, 25), candleScale: 1.05, pulseSpeed: 0.11 };
        case "research":
          return { pos: new THREE.Vector3(2.5, 2.0, 26), candleScale: 1.0, pulseSpeed: 0.06 };
        case "learn":
          return { pos: new THREE.Vector3(0, 3.2, 29), candleScale: 0.95, pulseSpeed: 0.04 };
        case "portfolio":
          return { pos: new THREE.Vector3(-1.5, 2.5, 30), candleScale: 0.95, pulseSpeed: 0.05 };
        case "profile":
          return { pos: new THREE.Vector3(0, 2.0, 31), candleScale: 0.9, pulseSpeed: 0.03 };
        default:
          return { pos: new THREE.Vector3(0, 1.8, 28), candleScale: 1.0, pulseSpeed: 0.065 };
      }
    };

    let targetCameraConfig = getSectionCameraConfig(activeTab);

    // Visibility change handling
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
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
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x += (targetCameraConfig.pos.x + mouse.x * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (targetCameraConfig.pos.y + mouse.y * 1.2 - camera.position.y) * 0.04;
      camera.position.z += (targetCameraConfig.pos.z - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      // Raycast mouse to interaction plane z = 0
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(interactionPlane, mouse3D);

      // Animate Candlesticks (Organic data breathing + local cursor reaction)
      for (let i = 0; i < candleItems.length; i++) {
        const item = candleItems[i];
        
        // Frontier candles experience slightly more active breathing
        const wave = item.isFrontier
          ? Math.sin(elapsedTime * 1.2 + item.phase) * 0.18
          : Math.sin(elapsedTime * 0.5 + item.phase) * 0.08;

        // Proximity calculation to mouse
        const distToMouse = Math.hypot(item.group.position.x - mouse3D.x, item.group.position.y - mouse3D.y);
        let hoverScale = 1.0;
        let hoverEmissive = 0.12;

        if (distToMouse < 3.2) {
          const influence = (3.2 - distToMouse) / 3.2;
          hoverScale += influence * 0.05; // 3-5% subtle scale
          hoverEmissive += influence * 0.35; // Emissive highlight
        }

        item.group.position.y = item.baseY + wave;
        item.group.scale.set(
          targetCameraConfig.candleScale * hoverScale,
          targetCameraConfig.candleScale * hoverScale,
          targetCameraConfig.candleScale * hoverScale
        );
        item.bodyMaterial.emissiveIntensity = hoverEmissive;
      }

      // Animate Price Line Pulse
      const pulseT = (elapsedTime * targetCameraConfig.pulseSpeed) % 1;
      const pointOnCurve = priceCurve.getPointAt(pulseT);
      pulseSphere.position.copy(pointOnCurve);

      // Animate Particles with Proximity Deflection
      const positionsAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const pArray = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pArray[idx] += particleVelocities[idx];
        pArray[idx + 1] += particleVelocities[idx + 1];
        pArray[idx + 2] += particleVelocities[idx + 2];

        // Cursor deflection
        const pX = pArray[idx];
        const pY = pArray[idx + 1];
        const dist = Math.hypot(pX - mouse3D.x, pY - mouse3D.y);
        if (dist < 2.8) {
          const force = (2.8 - dist) * 0.016;
          pArray[idx] += (pX - mouse3D.x) * force;
          pArray[idx + 1] += (pY - mouse3D.y) * force;
        }

        // Boundary wrap
        if (pArray[idx] > 28) pArray[idx] = -28;
        if (pArray[idx] < -28) pArray[idx] = 28;
        if (pArray[idx + 1] > 14) pArray[idx + 1] = -14;
        if (pArray[idx + 1] < -14) pArray[idx + 1] = 14;
      }
      positionsAttr.needsUpdate = true;

      // Animate Telemetry AI Lines (temporary connection pulses)
      if (Math.floor(elapsedTime * 2) % 4 === 0) {
        const c1 = candleItems[Math.floor(elapsedTime * 3) % candleItems.length]?.group.position;
        const c2 = candleItems[(Math.floor(elapsedTime * 3) + 3) % candleItems.length]?.group.position;
        if (c1 && c2) {
          const tArr = (telemetryGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
          tArr[0] = c1.x; tArr[1] = c1.y; tArr[2] = c1.z;
          tArr[3] = c2.x; tArr[4] = c2.y; tArr[5] = c2.z;
          (telemetryGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
          telemetryMat.opacity = 0.35 + Math.sin(elapsedTime * 5) * 0.15;
        }
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Dispose Three.js resources
      bodyGeometry.dispose();
      wickGeometry.dispose();
      curveGeometry.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      telemetryGeo.dispose();
      telemetryMat.dispose();

      candleItems.forEach(item => {
        item.bodyMaterial.dispose();
        item.wickMaterial.dispose();
      });

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // Update target camera config on activeTab changes
  useEffect(() => {
    if (window.__stockMentorPointer) {
      window.__stockMentorPointer.activeTab = activeTab;
    }
  }, [activeTab]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {!webGLSupported && (
        <div className="absolute inset-0 ambient-grid opacity-30 dark:opacity-20" />
      )}
    </div>
  );
};
