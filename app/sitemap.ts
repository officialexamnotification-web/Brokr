import type { MetadataRoute } from "next";
import { categories, getBlogPosts, regions, tools } from "@/lib/data";
import { calculatorDefinitions } from "@/lib/calculators";
import { getPublishedManagedBlogs } from "@/lib/managed-blog-server";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tradivex.com").replace(/\/$/, "");
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/market/crypto", changeFrequency: "hourly" as const, priority: 0.8 },
    { path: "/market/forex", changeFrequency: "hourly" as const, priority: 0.8 },
    { path: "/market/stocks", changeFrequency: "hourly" as const, priority: 0.8 },
    { path: "/calculators", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/methodology", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/contact", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/affiliate-disclosure", changeFrequency: "yearly" as const, priority: 0.2 },
  ];
  const managedBlogs = await getPublishedManagedBlogs();
  return [
    ...staticPages.map((page) => ({ url: `${siteUrl}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...calculatorDefinitions.map((calculator) => ({ url: `${siteUrl}/calculators/${calculator.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...categories.map((category) => ({ url: `${siteUrl}/category/${category.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...regions.map((region) => ({ url: `${siteUrl}/region/${region.code}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...tools.map((tool) => ({ url: `${siteUrl}/tool/${tool.slug}`, lastModified: tool.lastVerifiedAt ? new Date(tool.lastVerifiedAt) : undefined, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getBlogPosts().map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...managedBlogs.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date ? new Date(post.date) : undefined, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
