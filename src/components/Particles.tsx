import React, { type ComponentPropsWithoutRef, useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

const remapValue = (
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
): number => {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return remapped > 0 ? remapped : 0;
};

/**
 * Canvas particle field that drifts and gently follows the mouse.
 *
 * All drawing state lives in refs inside a single effect, so mouse movement
 * never triggers a React re-render — the canvas is updated directly each frame.
 */
export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    const dpr = window.devicePixelRatio || 1;
    const rgb = hexToRgb(color).join(", ");
    const canvasSize = { w: 0, h: 0 };
    const mouse = { x: 0, y: 0 };
    let circles: Circle[] = [];
    let rafId: number | null = null;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const circleParams = (): Circle => ({
      x: Math.floor(Math.random() * canvasSize.w),
      y: Math.floor(Math.random() * canvasSize.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    });

    const drawCircle = (circle: Circle) => {
      const { x, y, translateX, translateY, size: r, alpha } = circle;
      context.translate(translateX, translateY);
      context.beginPath();
      context.arc(x, y, r, 0, 2 * Math.PI);
      context.fillStyle = `rgba(${rgb}, ${alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initCanvas = () => {
      canvasSize.w = container.offsetWidth;
      canvasSize.h = container.offsetHeight;
      canvas.width = canvasSize.w * dpr;
      canvas.height = canvasSize.h * dpr;
      canvas.style.width = `${canvasSize.w}px`;
      canvas.style.height = `${canvasSize.h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      circles = Array.from({ length: quantity }, circleParams);
      context.clearRect(0, 0, canvasSize.w, canvasSize.h);
      circles.forEach(drawCircle);
    };

    const animate = () => {
      context.clearRect(0, 0, canvasSize.w, canvasSize.h);

      circles = circles.map((circle) => {
        // Fade particles out as they approach the canvas edges
        const closestEdge = Math.min(
          circle.x + circle.translateX - circle.size,
          canvasSize.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.h - circle.y - circle.translateY - circle.size
        );
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );
        if (remapClosestEdge > 1) {
          circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }

        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX +=
          (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY +=
          (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        // Replace particles that drifted out of the canvas
        const outOfBounds =
          circle.x < -circle.size ||
          circle.x > canvasSize.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.h + circle.size;
        const next = outOfBounds ? circleParams() : circle;

        drawCircle(next);
        return next;
      });

      rafId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h } = canvasSize;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.x = x;
        mouse.y = y;
      }
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initCanvas, 200);
    };

    initCanvas();
    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, quantity, staticity, ease, size, vx, vy, refresh]);

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
