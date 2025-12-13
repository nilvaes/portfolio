export default function Footer() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space mt-10 lg:mt-20">
      <div className="flex justify-center items-center gap-3">
        <a
          href="https://www.linkedin.com/in/%C3%B6mer-savas-b31643399/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10"
        >
          <img className="w-8 md:w-10" src="assets/logos/linkedin-white.svg" />
        </a>
        <a
          href="https://github.com/nilvaes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-10 md:w-12" src="assets/logos/github-white.svg" />
        </a>
      </div>
      <div className="bg-linear-to-r from-transparent mb-4 via-neutral-700 to-transparent h-px w-full" />
      <div>© {new Date().getFullYear()} Savas. Alle Rechte vorbehalten.</div>
      <div>
        Gebaut mit{" "}
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
          TypeScript{" "}
        </a>
        und{" "}
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
