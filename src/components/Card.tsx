import { motion } from "motion/react";

const chipShadow =
  "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -4px 8px rgba(0,0,0,0.4), 0 8px 14px rgba(0,0,0,0.45)";
const chipShadowLift =
  "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -3px 6px rgba(0,0,0,0.3), 0 14px 24px rgba(0,0,0,0.55)";

const chipClass =
  "border border-white/25 border-b-black/50 bg-linear-to-b from-[#3d4168] to-[#1c1f38]";

export default function Card({
  text,
  style,
  image,
  containerRef,
}: {
  text?: string;
  style: React.CSSProperties;
  image?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const dragProps = {
    drag: true as const,
    dragConstraints: containerRef,
    dragElastic: 1,
    whileHover: { scale: 1.06 },
    whileDrag: {
      scale: 1.1,
      zIndex: 20,
      cursor: "grabbing",
      boxShadow: chipShadowLift,
    },
  };

  return image && !text ? (
    <motion.div
      className={`absolute flex size-11 cursor-grab touch-none select-none items-center justify-center rounded-full sm:size-16 ${chipClass}`}
      style={{ ...style, boxShadow: chipShadow }}
      {...dragProps}
    >
      <img src={image} alt="" className="w-6 sm:w-8" draggable={false} />
    </motion.div>
  ) : (
    <motion.div
      className={`absolute flex w-28 cursor-grab touch-none select-none items-center justify-center gap-1.5 rounded-full px-2 py-2 text-center text-xs font-extralight sm:w-48 sm:gap-2 sm:px-3 sm:py-4 sm:text-xl ${chipClass}`}
      style={{ ...style, boxShadow: chipShadow }}
      {...dragProps}
    >
      <span
        className="grid shrink-0 grid-cols-2 gap-0.5 opacity-50"
        aria-hidden
      >
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
        <span className="size-0.5 rounded-full bg-white sm:size-1" />
      </span>
      {text}
    </motion.div>
  );
}
