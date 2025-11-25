import { createClient, type Entry } from "contentful";

export type DishFields = {
  title: string;
  slug: string;
  description?: string;
  recipe?: string;
  skills?: string;
  imageUrl?: string;
  reviewCode?: string;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Get all dishes
export async function getDishes(): Promise<Entry<DishFields>[]> {
  const res = await client.getEntries<DishFields>({
    content_type: "dish",
    order: ["-fields.title"],
    include: 2, // 👈 resolve linked assets like heroImage
  });

  console.log("DISHES:", res.items.length);
  return res.items as Entry<DishFields>[];
}

// Get a single dish by slug
export async function getDishBySlug(
  slug: string
): Promise<Entry<DishFields> | null> {
  const res = await client.getEntries<DishFields>({
    content_type: "dish",
    "fields.slug": slug,
    limit: 1,
    include: 2, // 👈 important
  });

  return (res.items[0] as Entry<DishFields> | undefined) ?? null;
}

// Get dish by secret review code
export async function getDishByReviewCode(
  reviewCode: string
): Promise<Entry<DishFields> | null> {
  const res = await client.getEntries<DishFields>({
    content_type: "dish",
    "fields.reviewCode": reviewCode,
    limit: 1,
    include: 2, // 👈 important
  });

  return (res.items[0] as Entry<DishFields> | undefined) ?? null;
}
