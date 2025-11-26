import { notFound } from "next/navigation";
import { getDishes, getDishBySlug, getAssetById } from "@/lib/contentful";
import { getReviewsForDish } from "@/lib/reviews";

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

  const fields = dish.fields as any;
  const { title, description, recipe, skills, heroImage } = fields;

  // --- IMAGE: resolve heroImage asset ---
  let img: string | null = null;

  if (heroImage?.sys?.id) {
    try {
      const asset = await getAssetById(heroImage.sys.id);
      const fileUrl = (asset.fields as any)?.file?.url as string | undefined;

      if (fileUrl) {
        img = fileUrl.startsWith("http") ? fileUrl : `https:${fileUrl}`;
      }

      console.log("HERO ASSET FIELDS:", asset.fields);
      console.log("HERO IMAGE URL:", img);
    } catch (e) {
      console.error("Error fetching heroImage asset:", e);
    }
  } else {
    console.log("No heroImage set on this dish.");
  }

  // --- REVIEWS ---
  const reviews = await getReviewsForDish(slug);
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <article className="space-y-10 py-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {skills && (
          <p className="text-sm text-gray-800 dark:text-gray-400">
            Skills: {skills}
          </p>
        )}
      </header>

      {/* IMAGE */}
      {img && (
        <div className="h-64 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* DESCRIPTION */}
      {description && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-800 dark:text-gray-300">
            {typeof description === "string" ? description : ""}
          </p>
        </section>
      )}

      {/* RECIPE */}
      {recipe && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Recipe / Notes</h2>
          <p className="whitespace-pre-line text-gray-800 dark:text-gray-300">
            {typeof recipe === "string" ? recipe : ""}
          </p>
        </section>
      )}

      {/* REVIEWS */}
      <section className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">Guest Reviews</h2>

        {reviews.length > 0 ? (
          <p className="text-lg font-medium">
            ⭐ {avgRating}{" "}
            <span className="text-gray-800 text-sm">
              ({reviews.length} reviews)
            </span>
          </p>
        ) : (
          <p className="text-gray-800 dark:text-gray-300 text-sm">
            No reviews yet — be the first to leave feedback using the QR code!
          </p>
        )}

        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-gray-200 p-4 shadow-sm dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {r.reviewer_name || "Anonymous"}
                </p>
                <p className="text-yellow-500">
                  {"⭐".repeat(r.rating)}
                </p>
              </div>

              {r.comment && (
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                  {r.comment}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
