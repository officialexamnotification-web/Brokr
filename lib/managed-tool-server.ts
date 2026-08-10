import { cache } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Tool } from "@/lib/data";
import { getFirebaseFirestore } from "@/lib/firebase";

function listValue(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeManagedTool(id: string, data: Record<string, unknown>): Tool {
  return {
    id: Number(data.id ?? Date.now()),
    name: String(data.name ?? "Managed tool"),
    slug: String(data.slug ?? id),
    logo: String(data.logo ?? "TX"),
    rating: typeof data.rating === "number" ? data.rating : null,
    description: String(data.description ?? ""),
    longDescription: String(data.longDescription ?? data.description ?? ""),
    category: String(data.category ?? "Trading Tools"),
    categoryId: Number(data.categoryId ?? 7),
    features: listValue(data.features),
    pros: listValue(data.pros),
    cons: listValue(data.cons),
    pricing: String(data.pricing ?? "Provider-defined"),
    pricingDetail: String(data.pricingDetail ?? data.pricing ?? "Confirm current pricing with the provider."),
    minDeposit: String(data.minDeposit ?? "Not stated"),
    platforms: listValue(data.platforms),
    website: String(data.website ?? data.websiteUrl ?? ""),
    affiliate: Boolean(data.affiliate),
    trending: Boolean(data.trending),
    featured: Boolean(data.featured),
    yearFounded: Number(data.yearFounded ?? 0),
    regulation: listValue(data.regulation),
    supportedCountries: listValue(data.supportedCountries),
    depositMethods: listValue(data.depositMethods),
    withdrawalTime: String(data.withdrawalTime ?? "Provider-dependent"),
    customerSupport: String(data.customerSupport ?? "Provider-dependent"),
    mobileApp: Boolean(data.mobileApp),
    demoAccount: Boolean(data.demoAccount),
    faq: Array.isArray(data.faq) ? data.faq as Tool["faq"] : [],
    bestFor: listValue(data.bestFor),
    sourceUrls: listValue(data.sourceUrls),
    lastVerifiedAt: typeof data.lastVerifiedAt === "string" ? data.lastVerifiedAt : null,
    dataStatus: data.dataStatus === "verified" || data.dataStatus === "partially_verified" ? data.dataStatus : "unverified",
  };
}

export const getPublishedManagedTools = cache(async () => {
  const db = getFirebaseFirestore();
  if (!db) return [] as Tool[];

  try {
    const snapshot = await getDocs(query(collection(db, "managedTools"), where("status", "==", "published")));
    return snapshot.docs
      .map((item) => normalizeManagedTool(item.id, item.data() as Record<string, unknown>))
      .filter((tool) => tool.slug.trim() && tool.name.trim());
  } catch {
    return [] as Tool[];
  }
});

export const getPublishedManagedTool = cache(async (slug: string) => {
  const items = await getPublishedManagedTools();
  return items.find((tool) => tool.slug === slug) ?? null;
});
