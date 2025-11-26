export default function AboutPage() {
  return (
    <section className="py-10 md:py-16">
      {/* Title block – always first (mobile & desktop) */}
      <div className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Aayan Sharma
        </h1>
      </div>

      {/* Layout: text + image */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Image – second on mobile, right on desktop */}
        <div className="order-1 md:order-2 md:flex-1 flex md:justify-end">
          <div className="aspect-square w-48 md:w-64 lg:w-72">
            <img
              src="/about-me.png"
              alt="Portrait of Aayan Sharma"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Text – below image on mobile, left on desktop */}
        <div className="order-2 md:order-1 md:flex-1 space-y-4 text-foreground">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            feugiat, libero sed cursus mattis, augue nisl pharetra dui, non
            sagittis turpis velit sit amet erat. Integer euismod, mi non
            vulputate rhoncus, nisi risus fermentum augue, et convallis nibh
            eros id elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            sagittis, elit eget tempus faucibus, neque arcu fermentum arcu, sed
            finibus magna lacus eu lectus. Donec id velit at lorem interdum
            posuere. Sed viverra, nisl sed dapibus fermentum, urna neque
            suscipit mi, in gravida lectus ante sit amet turpis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet
            urna tincidunt, imperdiet nunc at, pharetra leo. Sed ut risus id
            eros tincidunt mollis quis sit amet nibh.
          </p>
        </div>
      </div>
    </section>
  );
}
