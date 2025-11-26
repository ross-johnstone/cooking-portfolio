"use client";

import { useState } from "react";

const slides = [
  {
    src: "/carousel-1.jpg",
    alt: "Dish 1",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "/carousel-2.jpg",
    alt: "Dish 2",
    caption: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    src: "/carousel-3.jpg",
    alt: "Dish 3",
    caption: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    src: "/carousel-4.jpg",
    alt: "Dish 4",
    caption: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
];

export function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const current = slides[index];

  const goNext = () => setIndex((i) => (i + 1) % slides.length);
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section className="mt-10 md:mt-16 space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        A few moments from the table
      </h2>

      <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-black/5 dark:bg-white/5 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover"
          />

          {/* Left / right buttons overlayed on image */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white hover:bg-black/70"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white hover:bg-black/70"
          >
            ›
          </button>

          {/* Slide indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full ${
                  i === index
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Caption row */}
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <p className="text-foreground max-w-xl">
            {current.caption}
          </p>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {index + 1} / {slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
