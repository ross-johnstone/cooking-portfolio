import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getDishes() {
  const res = await client.getEntries({
    content_type: "dish",
    order: ["-fields.title"],
  });

  console.log("DISHES:", res.items.length);
  return res.items;
}

export async function getDishBySlug(slug: string) {
  const res = await client.getEntries({
    content_type: "dish",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] ?? null;
}

export async function getDishByReviewCode(reviewCode: string) {
  const res = await client.getEntries({
    content_type: "dish",
    "fields.reviewCode": reviewCode,
    limit: 1,
  });

  return res.items[0] ?? null;
}

// 🔑 new helper for heroImage
export async function getAssetById(id: string) {
  const asset = await client.getAsset(id);
  return asset;
}
