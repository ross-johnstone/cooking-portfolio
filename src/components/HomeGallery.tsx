export function HomeGallery() {
  const images = [
    { src: "/carousel-1.jpg", alt: "Dish 1" },
    { src: "/carousel-2.jpg", alt: "Dish 2" },
    { src: "/carousel-3.jpg", alt: "Dish 3" },
    { src: "/carousel-4.jpg", alt: "Dish 4" },
  ];

  return (
    <section className="mt-10 md:mt-16 space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        A few moments from the table
      </h2>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {images.map((img) => (
            <div
              key={img.src}
              className="min-w-[260px] md:min-w-[320px] lg:min-w-[380px] overflow-hidden rounded-2xl bg-black/5"
            >
              <div className="aspect-[16/9] w-full">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
