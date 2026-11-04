import { useEffect, useRef } from "react";

const LERP = 0.16; // lower = more lag
const INTERACTIVE = "a, button, [role='tab'], [data-cursor]";

/**
 * A ring that trails the mouse with a soft lag and grows over interactive
 * elements. The native cursor stays visible. Disabled on touch devices and
 * for users who prefer reduced motion.
 */
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ring || !finePointer || reducedMotion) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // Jump to the cursor on first move instead of flying in from the corner.
        pos.x = target.x;
        pos.y = target.y;
        visible = true;
        ring.dataset.visible = "true";
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      ring.dataset.state = el?.dataset.cursor ?? (el ? "link" : "default");
    };

    const onLeave = () => {
      visible = false;
      ring.dataset.visible = "false";
    };
    const onDown = () => (ring.dataset.pressed = "true");
    const onUp = () => (ring.dataset.pressed = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      data-visible="false"
      data-state="default"
      aria-hidden
    />
  );
}
