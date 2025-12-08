export default function Footer() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="bg-linear-to-r from-transparent mb-4 via-neutral-700 to-transparent h-px w-full" />
      <div>© {new Date().getFullYear()} Savas. All rights reserved.</div>
      <div>
        Built with{" "}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          React
        </a>
        ,{" "}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          TypeScript
        </a>
        , and{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Tailwind CSS
        </a>
        .
      </div>
    </section>
  );
}
