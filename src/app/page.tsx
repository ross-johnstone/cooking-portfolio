import Link from "next/link";
import { HomeCarousel } from "@/components/HomeCarousel";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 py-10 md:py-16">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
          Culinary Portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          food, rated by folks who showed up.
        </h1>
        <p className="max-w-xl text-gray-800 dark:text-gray-300">
          I'm Aayan Sharma. I lure friends over with free food and collect honest reviews.
          <br />
          <em>No friends were harmed in the making of these meals.</em>
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
      </div>

      {/* Proper button-based carousel */}
      <HomeCarousel />
    </section>
  );
}
