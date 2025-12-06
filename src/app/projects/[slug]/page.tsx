import { notFound } from "next/navigation";
import { getDishes, getDishBySlug, getAssetById } from "@/lib/contentful";
import { getReviewsForDish } from "@/lib/reviews";

type Params = {
  slug: string;
};

// Force this route to always be handled dynamically (SSR)
export const dynamic = "force-dynamic";

export default async function DishPage({ params }: { params: Params }) {
  const { slug } = params;

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
    <section className="space-y-6 py-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {skills && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Skills:</span> {skills}
          </p>
        )}
      </header>

      {/* IMAGE */}
      {img && (
        <div className="relative aspect-video w-full max-w-3xl">
          <img
            src={img}
            alt={title}
            className="h-full w-full rounded-xl object-cover"
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
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Guest Reviews</h2>

        {reviews.length > 0 ? (
          <>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              ⭐ {avgRating} ({reviews.length} reviews)
            </p>

            <div className="space-y-3">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {r.reviewer_name || "Anonymous"}
                    </span>
                    <span>{"⭐".repeat(r.rating)}</span>
                  </div>

                  {r.comment && (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {r.comment}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-300">
            No reviews yet — be the first to leave feedback using the QR code!
          </p>
        )}
      </section>
    </section>
  );
}

// IMPORTANT: remove / comment out the old SSG bits if you still have them
// export const revalidate = 60;
// export async function generateStaticParams() { ... }
