import { notFound } from "next/navigation";
import { getDishByReviewCode } from "@/lib/contentful";
import { ReviewForm } from "./ReviewForm";

type Params = {
  code: string;
};

export const dynamic = "force-dynamic";

export default async function ReviewPage({ params }: { params: Params }) {
  const { code } = params;

  const dish = await getDishByReviewCode(code);
  if (!dish) {
    return notFound();
  }

  const { title, slug } = dish.fields as any;

  return (
    <section className="space-y-4 py-8">
      <p className="text-xs uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">
        Guest Review
      </p>

      <h1 className="text-3xl font-semibold tracking-tight">
        Rate: {title}
      </h1>

      <p className="max-w-xl text-gray-800 dark:text-gray-300">
        Thanks for coming! Please leave an honest review of this dish. Your
        feedback helps me build my culinary portfolio.
      </p>

      <ReviewForm dishSlug={slug} reviewCode={code} />
    </section>
  );
}
