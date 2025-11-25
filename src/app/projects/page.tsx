import Link from "next/link";
import { getDishes, type DishFields } from "@/lib/contentful";

export const revalidate = 60;

export default async function ProjectsPage() {
  const dishes = await getDishes();

  const hasDishes = dishes && dishes.length > 0;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dishes</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Home-cooked dishes served to real guests. Reviews will appear on each dish.
        </p>
      </div>

      {!hasDishes && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No dishes found. Check that your Contentful content type ID is correct
          and that you have published Dish entries.
        </p>
      )}

      {hasDishes && (
        <div className="grid gap-4 md:grid-cols-2">
          {dishes.map((entry) => {
            const { slug, title, description } = entry.fields as DishFields;

            return (
              <Link
                key={entry.sys.id}
                href={`/projects/${slug}`}
                className="group rounded-xl border border-gray-200 p-4 transition
                           hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg
                           dark:border-gray-800 dark:hover:border-gray-500"
              >
                <h2 className="text-lg font-semibold group-hover:underline">
                  {title}
                </h2>

                {description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {typeof description === "string" ? description : ""}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
