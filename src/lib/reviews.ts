import { supabase } from "./supabaseClient";

export type Review = {
  id: string;
  created_at: string;
  dish_slug: string;
  review_code: string;
  reviewer_name: string | null;
  rating: number;
  comment: string | null;
};

export async function getReviewsForDish(dishSlug: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("dish_slug", dishSlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return (data ?? []) as Review[];
}
