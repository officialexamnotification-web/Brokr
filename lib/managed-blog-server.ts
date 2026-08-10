import { cache } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { BlogPost } from "@/lib/data";
import { getFirebaseFirestore } from "@/lib/firebase";

function listValue(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeBlog(id: string, data: Record<string, unknown>): BlogPost {
  return {
    id: Number(data.id ?? Date.now()),
    slug: String(data.slug ?? id),
    title: String(data.title ?? "Untitled article"),
    excerpt: String(data.excerpt ?? ""),
    content: String(data.content ?? ""),
    category: String(data.category ?? "Education"),
    author: String(data.author ?? "Tradivex Editorial Team"),
    date: String(data.date ?? ""),
    readTime: String(data.readTime ?? "5 min"),
    image: String(data.imageUrl ?? data.image ?? "TX"),
    tags: listValue(data.tags),
    sourceUrls: listValue(data.sourceUrls),
  };
}

export const getPublishedManagedBlogs = cache(async () => {
  const db = getFirebaseFirestore();
  if (!db) return [] as BlogPost[];

  try {
    const snapshot = await getDocs(query(collection(db, "managedBlogs"), where("status", "==", "published")));
    return snapshot.docs
      .map((item) => normalizeBlog(item.id, item.data() as Record<string, unknown>))
      .filter((post) => post.slug.trim());
  } catch {
    return [] as BlogPost[];
  }
});

export const getPublishedManagedBlog = cache(async (slug: string) => {
  const posts = await getPublishedManagedBlogs();
  return posts.find((post) => post.slug === slug) ?? null;
});
