import React, { useEffect, useState, useRef } from "react";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

interface WakeParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "open" | "drag" | "text">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position & Velocity references for smooth spring physics
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ringVel = useRef({ x: 0, y: 0 });
  const magneticOffset = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const speedRef = useRef(0);
  const isInitialized = useRef(false);

  // Wake particle pool
  const particlesRef = useRef<WakeParticle[]>([]);
  const particleIdRef = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Device and Accessibility Check
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile/tablet displays utilize native touch gestures
    if (isTouch) {
      return;
    }

    setEnabled(true);

    // Initial center position fallback
    if (!isInitialized.current) {
      const initialX = window.innerWidth / 2;
      const initialY = window.innerHeight / 2;
      mousePos.current = { x: initialX, y: initialY };
      dotPos.current = { x: initialX, y: initialY };
      ringPos.current = { x: initialX, y: initialY };
      lastMousePos.current = { x: initialX, y: initialY };
      isInitialized.current = true;
    }

    // Initialize global pointer state for Three.js synchronization
    window.__stockMentorPointer = {
      x: mousePos.current.x,
      y: mousePos.current.y,
      normalizedX: 0,
      normalizedY: 0,
      isHover: false,
      activeTab: "home",
      speed: 0
    };

    // 2. Global Pointer Move Listener with Window Capturing
    // Uses capture phase so modals, canvas overlays, and chart listeners cannot intercept it
    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      speedRef.current = Math.hypot(dx, dy);
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Synchronize with Three.js 3D background
      if (window.__stockMentorPointer) {
        window.__stockMentorPointer.x = e.clientX;
        window.__stockMentorPointer.y = e.clientY;
        window.__stockMentorPointer.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
        window.__stockMentorPointer.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
        window.__stockMentorPointer.isHover = cursorState === "hover";
        window.__stockMentorPointer.speed = speedRef.current;
      }

      // Generate subtle quantum wake particles during swift movement
      if (!prefersReducedMotion && speedRef.current > 12 && particlesRef.current.length < 24) {
        particleIdRef.current++;
        particlesRef.current.push({
          id: particleIdRef.current,
          x: e.clientX,
          y: e.clientY,
          vx: -dx * 0.12 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.12 + (Math.random() - 0.5) * 1.5,
          opacity: 0.45,
          size: 1.5 + Math.random() * 1.2
        });
      }

      // Inspect target element for cursor semantic states & magnetic attraction
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = target.closest("input, textarea, [contenteditable='true']");
      const isChartOrCanvas = target.closest(".recharts-wrapper, canvas, svg, [data-cursor='view']");
      const isDrag = target.closest("[data-cursor='drag'], .slider, [role='slider']");
      const isOpenTrigger = target.closest("[data-cursor='open']");
      const isClickable = target.closest<HTMLElement>(
        "button, a, select, [role='button'], .cursor-pointer, [data-magnetic]"
      );

      if (isText) {
        setCursorState("text");
        magneticOffset.current = { x: 0, y: 0 };
      } else if (isChartOrCanvas) {
        setCursorState("view");
        magneticOffset.current = { x: 0, y: 0 };
      } else if (isDrag) {
        setCursorState("drag");
        magneticOffset.current = { x: 0, y: 0 };
      } else if (isOpenTrigger) {
        setCursorState("open");
        magneticOffset.current = { x: 0, y: 0 };
      } else if (isClickable) {
        setCursorState("hover");

        // Subtle Magnetic Physics (attraction radius: 45px, max displacement: 10px)
        const rect = isClickable.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distFromCenter = Math.hypot(centerX - e.clientX, centerY - e.clientY);

        if (distFromCenter < 45) {
          const pull = 0.16;
          magneticOffset.current = {
            x: Math.max(-10, Math.min(10, (centerX - e.clientX) * pull)),
            y: Math.max(-10, Math.min(10, (centerY - e.clientY) * pull))
          };
        } else {
          magneticOffset.current = { x: 0, y: 0 };
        }
      } else {
        setCursorState("default");
        magneticOffset.current = { x: 0, y: 0 };
      }
    };

    // 3. Pointer Down / Click Pulse Ripple
    const handlePointerDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: ClickRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 350);
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    // Maintain position when cursor enters/leaves viewport
    const handleMouseLeave = () => {
      magneticOffset.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handlePointerMove, { capture: true, passive: true });
    window.addEventListener("mousedown", handlePointerDown, { capture: true });
    window.addEventListener("mouseup", handlePointerUp, { capture: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // 4. RequestAnimationFrame Physics Engine (Spring Lerp Ring-to-Dot Tracking)
    const springTension = 0.22; // Spring responsiveness
    const springDamping = 0.72; // Spring velocity friction

    const updatePhysics = () => {
      // Immediate Dot Tracking (Lerp 0.88 = essentially instantaneous)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.88;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.88;

      // Spring-Physics Lerp Ring Tracking
      const targetRingX = dotPos.current.x + magneticOffset.current.x;
      const targetRingY = dotPos.current.y + magneticOffset.current.y;

      const forceX = (targetRingX - ringPos.current.x) * springTension;
      const forceY = (targetRingY - ringPos.current.y) * springTension;

      ringVel.current.x = (ringVel.current.x + forceX) * springDamping;
      ringVel.current.y = (ringVel.current.y + forceY) * springDamping;

      ringPos.current.x += ringVel.current.x;
      ringPos.current.y += ringVel.current.y;

      // Apply transforms directly to DOM elements avoiding React render overhead
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Render Canvas Wake Particles
      const canvas = canvasRef.current;
      if (canvas && particlesRef.current.length > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#6F9BFF";

          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= 0.035;

            if (p.opacity <= 0) {
              particlesRef.current.splice(i, 1);
            } else {
              ctx.globalAlpha = p.opacity;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      rafId.current = requestAnimationFrame(updatePhysics);
    };

    rafId.current = requestAnimationFrame(updatePhysics);

    // Canvas Resize Handling
    const handleCanvasResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleCanvasResize();
    window.addEventListener("resize", handleCanvasResize);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove, { capture: true });
      window.removeEventListener("mousedown", handlePointerDown, { capture: true });
      window.removeEventListener("mouseup", handlePointerUp, { capture: true });
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleCanvasResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorState]);

  if (!enabled) return null;

  // Semantic outer ring styles
  const ringClasses = {
    default: "w-8 h-8 -top-4 -left-4 border-slate-400/50 dark:border-white/35 shadow-[0_0_12px_rgba(255,255,255,0.06)]",
    hover: "w-11 h-11 -top-5.5 -left-5.5 border-[#6F9BFF] bg-[#6F9BFF]/10 scale-110 shadow-[0_0_15px_rgba(111,155,255,0.35)]",
    view: "w-14 h-14 -top-7 -left-7 border-[#6EE7B7] bg-[#6EE7B7]/10 shadow-[0_0_18px_rgba(110,231,183,0.35)]",
    open: "w-12 h-12 -top-6 -left-6 border-[#8B7CFF] bg-[#8B7CFF]/10 shadow-[0_0_16px_rgba(139,124,255,0.35)]",
    drag: "w-9 h-9 -top-4.5 -left-4.5 border-[#F5C76B] bg-[#F5C76B]/10 shadow-[0_0_14px_rgba(245,199,107,0.35)]",
    text: "w-4 h-7 -top-3.5 -left-2 border-slate-400 dark:border-slate-200 rounded-sm"
  }[cursorState];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2147483647] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Micro-Particle Motion Wake Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 2. Click Data Pulse Ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#6F9BFF] animate-ping opacity-75 pointer-events-none"
        />
      ))}

      {/* 3. Central Precision Micro-Point (Instantaneous) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full transition-colors duration-150 pointer-events-none ${
          cursorState === "hover"
            ? "bg-[#6F9BFF]"
            : cursorState === "view"
            ? "bg-[#6EE7B7]"
            : cursorState === "open"
            ? "bg-[#8B7CFF]"
            : cursorState === "drag"
            ? "bg-[#F5C76B]"
            : "bg-slate-900 dark:bg-white"
        } ${isClicking ? "scale-150" : "scale-100"}`}
      />

      {/* 4. Outer Spring Ring (Spring Physics Lerp Engine) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,background-color,border-color,transform] duration-200 ease-out pointer-events-none ${ringClasses} ${
          isClicking ? "scale-90" : ""
        }`}
      >
        {cursorState === "view" && (
          <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-mono tracking-tighter uppercase text-[#6EE7B7] font-bold">
            VIEW
          </span>
        )}
        {cursorState === "open" && (
          <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-mono tracking-tighter uppercase text-[#8B7CFF] font-bold">
            OPEN
          </span>
        )}
      </div>
    </div>
  );
};
