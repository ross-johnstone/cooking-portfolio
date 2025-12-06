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
          <p className="italic">
            "I'm trying out new recipes and coercing my friends to be guinea pigs."
          </p>
          <p>
            I'm not formally trained, this whole site is just me learning, experimenting,
            and seeing what happens when I feed people I care about. If you want to try
            anything yourself, my recipes (plus easy substitutions) are on the dishes page.
          </p>

          <p className="italic">
            "I can't guarantee good photos, but I can guarantee good food."
          </p>
          <p>
            TThe lighting might betray me,
            but the flavours won't.
          </p>

          <p className="italic">
            "I just want to make a nice experience for my friends."
          </p>
          <p>
            At the end of the day, it's all about good company, good vibes, and hopefully
            edible outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
