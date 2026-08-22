import { motion } from "motion/react";

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
    whileDrag: { scale: 1.1, zIndex: 20, cursor: "grabbing" },
  };

  return image && !text ? (
    <motion.img
      src={image}
      className="absolute w-9 cursor-grab touch-none select-none drop-shadow-lg sm:w-15"
      style={style}
      {...dragProps}
    />
  ) : (
    <motion.div
      className="absolute flex w-28 cursor-grab touch-none select-none items-center justify-center gap-1.5 rounded-full bg-storm px-2 py-2 text-center text-xs font-extralight shadow-md ring ring-white/20 sm:w-48 sm:gap-2 sm:px-3 sm:py-4 sm:text-xl"
      style={style}
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
