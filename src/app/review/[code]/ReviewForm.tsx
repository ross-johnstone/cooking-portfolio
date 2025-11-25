"use client";

import { useState } from "react";

type Props = {
  dishSlug: string;
  reviewCode: string;
};

export function ReviewForm({ dishSlug, reviewCode }: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [comment, setComment] = useState("");
  const [status, setStatus] =
    useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishSlug,
          reviewCode,
          reviewerName: name,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setRating("");
      setComment("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="rounded-lg border border-green-500 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200">
        Thanks! Your review has been saved. 💚
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 p-4 shadow-sm dark:border-gray-800"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Your name (optional)
        </label>
        <input
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-black dark:text-white"
          placeholder="e.g. Alex"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Rating (1–5)
        </label>
        <input
          type="number"
          min={1}
          max={5}
          required
          className="w-24 rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-black dark:text-white"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value ? Number(e.target.value) : "")
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Comment
        </label>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-black dark:text-white"
          rows={4}
          required
          placeholder="What did you like? Anything to improve?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full border border-black bg-black px-5 py-2 text-sm font-medium text-white transition
                   hover:bg-transparent hover:text-black
                   disabled:cursor-not-allowed disabled:opacity-60
                   dark:border-white dark:bg-white dark:text-black
                   dark:hover:bg-transparent dark:hover:text-white"
      >
        {status === "submitting" ? "Submitting..." : "Submit review"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
