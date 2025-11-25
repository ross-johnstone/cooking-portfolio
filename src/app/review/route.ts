import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dishSlug, reviewCode, reviewerName, rating, comment } = body;

    if (!dishSlug || !reviewCode || rating == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: "Invalid rating" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("reviews").insert({
      dish_slug: dishSlug,
      review_code: reviewCode,
      reviewer_name: reviewerName || null,
      rating: numericRating,
      comment: comment || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
