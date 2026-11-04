import { cn } from "../lib/utils";

type BrowserFrameProps = {
  src: string;
  alt: string;
  url: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/** Screenshot wrapped in a minimal browser window (traffic lights + address bar). */
export function BrowserFrame({
  src,
  alt,
  url,
  className,
  imgClassName,
  loading = "lazy",
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-2xl shadow-black/20",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-ink/10 bg-surface px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-ink/6 px-3 py-0.5 text-center text-[11px] text-muted">
          {url}
        </div>
        <span className="w-10" aria-hidden />
      </div>
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          width={1200}
          height={750}
          className={cn("block aspect-[16/10] w-full object-cover object-top", imgClassName)}
        />
      </div>
    </div>
  );
}
