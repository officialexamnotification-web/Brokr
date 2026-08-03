import type { MetadataRoute } from "next";
import { categories, getBlogPosts, regions, tools } from "@/lib/data";
import { calculatorDefinitions } from "@/lib/calculators";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...calculatorDefinitions.map((calculator) => ({ url: `${siteUrl}/calculators/${calculator.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...categories.map((category) => ({ url: `${siteUrl}/category/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...regions.map((region) => ({ url: `${siteUrl}/region/${region.code}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...tools.map((tool) => ({ url: `${siteUrl}/tool/${tool.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getBlogPosts().map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
