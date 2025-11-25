import { notFound } from "next/navigation";
import Image from "next/image";
import { getDishes, getDishBySlug } from "@/lib/contentful";

type Params = {
  slug: string;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((entry: any) => ({
    slug: entry.fields.slug,
  }));
}

export default async function DishPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const dish = await getDishBySlug(slug);
  if (!dish) return notFound();

  const { title, description, recipe, skills, heroImage } = dish.fields as any;

  console.log("HERO IMAGE FIELDS:", heroImage?.fields); // should now show full asset

  const imageUrl = heroImage?.fields?.file?.url
    ? "https:" + heroImage.fields.file.url
    : null;

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {skills && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Skills: {skills}
          </p>
        )}
      </header>

      {imageUrl && (
        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <Image
            src={imageUrl}
            alt={heroImage.fields?.title || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {description && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {typeof description === "string" ? description : ""}
          </p>
        </section>
      )}

      {recipe && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Recipe / Notes</h2>
          <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">
            {typeof recipe === "string" ? recipe : ""}
          </p>
        </section>
      )}

      {/* reviews will go here in Phase 3 */}
    </article>
  );
}
