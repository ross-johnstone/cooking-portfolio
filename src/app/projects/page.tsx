import Link from "next/link";

const mockDishes = [
  {
    slug: "lemon-herb-chicken",
    title: "Lemon Herb Roast Chicken",
    blurb: "Crispy skin, tender meat, zesty pan sauce.",
  },
  {
    slug: "mushroom-risotto",
    title: "Wild Mushroom Risotto",
    blurb: "Creamy, rich, finished with parmesan and butter.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dishes</h1>
        <p className="text-gray-600 dark:text-gray-300">
          A growing collection of home-cooked dishes served to real guests.
          Their reviews will appear on each dish page.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockDishes.map((dish) => (
          <Link
            key={dish.slug}
            href={`/projects/${dish.slug}`}
            className="group rounded-xl border border-gray-200 p-4 transition
                       hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg
                       dark:border-gray-800 dark:hover:border-gray-500"
          >
            <h2 className="text-lg font-semibold group-hover:underline">
              {dish.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {dish.blurb}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
