import { notFound } from "next/navigation";
import { getDishByReviewCode, type DishFields } from "@/lib/contentful";
import { ReviewForm } from "./ReviewForm";

type Params = {
  code: string;
};

export const dynamic = "force-dynamic";

export const revalidate = 0; // always fresh, or increase later

export default async function ReviewPage({ params }: { params: Params }) {
  const { code } = params;

  const dish = await getDishByReviewCode(code);
  if (!dish) {
    return notFound();
  }

  const { title, slug } = dish.fields as DishFields;

  return (
    <main className="mx-auto max-w-xl space-y-6 py-10">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Guest Review
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Rate: {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Thanks for coming! Please leave an honest review of this dish. Your
          feedback helps me build my culinary portfolio.
        </p>
      </div>

      <ReviewForm dishSlug={slug} reviewCode={code} />
    </main>
  );
}
