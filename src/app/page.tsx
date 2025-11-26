import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 py-10 md:py-16">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-800 dark:text-gray-300">
          Culinary Portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Home-cooked dishes, rated by real guests.
        </h1>
        <p className="max-w-xl text-gray-800 dark:text-gray-300">
          I&apos;m Aayan Sharma, an aspiring cook. I invite friends over,
          serve them dinner, and collect honest reviews. This site is my
          culinary CV — the dishes I&apos;ve cooked and what people thought.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/about"
          className="rounded-full border border-black bg-black px-5 py-2 text-sm font-medium text-white transition
                     hover:bg-transparent hover:text-black
                     dark:border-white dark:bg-white dark:text-black
                     dark:hover:bg-transparent dark:hover:text-white"
        >
          About Me
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-black bg-black px-5 py-2 text-sm font-medium text-white transition
                     hover:bg-transparent hover:text-black
                     dark:border-white dark:bg-white dark:text-black
                     dark:hover:bg-transparent dark:hover:text-white"
        >
          View dishes
        </Link>
        {/* CV button removed */}
      </div>
    </section>
  );
}
