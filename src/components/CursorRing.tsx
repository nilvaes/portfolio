import { useEffect, useRef } from "react";

const LERP = 0.18; // lower = more lag
const INTERACTIVE = "a, button, [role='tab'], [data-cursor]";

/**
 * A ring that trails the pointer with a soft lag. It grows over interactive
 * elements and tightens briefly on click.
 * The native cursor stays visible. Disabled on touch devices and for users who
 * prefer reduced motion.
 *
 * Positioning and visuals live on separate elements: the outer wrapper is
 * only ever moved with `transform`, while size/scale changes happen on the
 * inner ring. Mixing both on one element makes `scale` shrink the
 * translate offset too, which threw the ring towards the top-left on click.
 */
export function CursorRing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || !ring || !finePointer || reducedMotion) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;
      place(ring, pos.x, pos.y);
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
        root.dataset.visible = "true";
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      root.dataset.state = el?.dataset.cursor ?? (el ? "link" : "default");
    };

    const onLeave = () => {
      visible = false;
      root.dataset.visible = "false";
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      root.dataset.pressed = "true";
    };
    const onUp = () => (root.dataset.pressed = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="cursor-root"
      data-visible="false"
      data-state="default"
      data-pressed="false"
      aria-hidden
    >
      <div ref={ringRef} className="cursor-follow">
        <div className="cursor-ring" />
      </div>
    </div>
  );
}
