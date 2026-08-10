"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ArrowRight, Clock, Image as ImageIcon } from "lucide-react";
import Badge from "@/components/common/Badge";
import ToolCard from "@/components/common/ToolCard";
import type { BlogPost, Tool } from "@/lib/data";
import { getFirebaseFirestore } from "@/lib/firebase";

function listValue(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function imageSource(value: string) {
  return /^(https?:|data:image\/|\/)/.test(value) ? value : "";
}

function normalizeTool(id: string, data: Record<string, unknown>): Tool {
  const categoryId = Number(data.categoryId ?? 7);
  return {
    id: Number(data.id ?? Date.now()), name: String(data.name ?? "Managed tool"), slug: String(data.slug ?? id), logo: String(data.logo ?? "TX"), rating: typeof data.rating === "number" ? data.rating : null,
    description: String(data.description ?? ""), longDescription: String(data.longDescription ?? data.description ?? ""), category: String(data.category ?? "Trading Tools"), categoryId,
    features: listValue(data.features), pros: listValue(data.pros), cons: listValue(data.cons), pricing: String(data.pricing ?? "Provider-defined"), pricingDetail: String(data.pricingDetail ?? data.pricing ?? "Confirm with provider."),
    minDeposit: String(data.minDeposit ?? "Not stated"), platforms: listValue(data.platforms), website: String(data.website ?? data.websiteUrl ?? ""), affiliate: Boolean(data.affiliate), trending: Boolean(data.trending), featured: Boolean(data.featured), yearFounded: Number(data.yearFounded ?? new Date().getFullYear()),
    regulation: listValue(data.regulation), supportedCountries: listValue(data.supportedCountries), depositMethods: listValue(data.depositMethods), withdrawalTime: String(data.withdrawalTime ?? "Provider-dependent"), customerSupport: String(data.customerSupport ?? "Provider-dependent"), mobileApp: Boolean(data.mobileApp), demoAccount: Boolean(data.demoAccount), faq: Array.isArray(data.faq) ? data.faq as Tool["faq"] : [], bestFor: listValue(data.bestFor), sourceUrls: listValue(data.sourceUrls), dataStatus: data.dataStatus === "verified" || data.dataStatus === "partially_verified" ? data.dataStatus : "unverified",
  };
}

function normalizeBlog(id: string, data: Record<string, unknown>): BlogPost {
  return {
    id: Number(data.id ?? Date.now()), slug: String(data.slug ?? id), title: String(data.title ?? "Untitled article"), excerpt: String(data.excerpt ?? ""), content: String(data.content ?? ""), category: String(data.category ?? "Education"), author: String(data.author ?? "Tradivex Editorial Team"), date: String(data.date ?? ""), readTime: String(data.readTime ?? "5 min"), image: String(data.imageUrl ?? data.image ?? "TX"), tags: listValue(data.tags), sourceUrls: listValue(data.sourceUrls),
  };
}

export function usePublishedTools() {
  const [items, setItems] = useState<Tool[]>([]);
  useEffect(() => {
    const db = getFirebaseFirestore();
    if (!db) return;
    return onSnapshot(query(collection(db, "managedTools"), where("status", "==", "published")), (snapshot) => {
      setItems(snapshot.docs.map((item) => normalizeTool(item.id, item.data() as Record<string, unknown>)));
    }, () => setItems([]));
  }, []);
  return items;
}

export function usePublishedBlogs() {
  const [items, setItems] = useState<BlogPost[]>([]);
  useEffect(() => {
    const db = getFirebaseFirestore();
    if (!db) return;
    return onSnapshot(query(collection(db, "managedBlogs"), where("status", "==", "published")), (snapshot) => {
      setItems(snapshot.docs.map((item) => normalizeBlog(item.id, item.data() as Record<string, unknown>)));
    }, () => setItems([]));
  }, []);
  return items;
}

export function ManagedToolGrid({ categoryId }: { categoryId?: number }) {
  const items = usePublishedTools();
  const filtered = categoryId ? items.filter((item) => item.categoryId === categoryId) : items;
  if (filtered.length === 0) return null;
  return <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((tool) => <ToolCard key={`managed-${tool.slug}`} tool={tool} />)}</div>;
}

export function ManagedBlogList() {
  const items = usePublishedBlogs();
  if (items.length === 0) return null;
  return <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800"><h2 className="mb-5 text-xl font-black text-slate-900 dark:text-white">More from Tradivex Editorial</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{items.map((post) => <Link key={`managed-${post.slug}`} href={`/blog/${post.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900"><div className="mb-4 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-primary-50 text-sm font-bold text-primary-600 dark:bg-primary-950/30">{imageSource(post.image) ? <Image src={imageSource(post.image)} alt="" width={48} height={48} unoptimized className="h-full w-full object-cover" /> : <ImageIcon className="h-5 w-5" />}</div><div><Badge variant="info">{post.category}</Badge><div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" /> {post.readTime}</div></div></div><h3 className="font-bold leading-snug text-slate-900 group-hover:text-primary-600 dark:text-white">{post.title}</h3><p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p><div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs dark:border-slate-800"><span className="text-slate-500 dark:text-slate-400">By {post.author}</span><span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">Read more <ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></div>;
}

export function ManagedToolPage({ slug }: { slug: string }) {
  const items = usePublishedTools();
  const tool = useMemo(() => items.find((item) => item.slug === slug), [items, slug]);
  if (!tool) return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-slate-500">Loading managed tool…</div>;
  return <div className="mx-auto max-w-4xl px-4 py-12"><Link href="/search" className="text-sm font-semibold text-primary-600">← Back to tools</Link><div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary-50 text-xl font-black text-primary-600 dark:bg-primary-950/30">{(tool as Tool & { imageUrl?: string }).imageUrl?.startsWith("http") ? <Image src={(tool as Tool & { imageUrl?: string }).imageUrl as string} alt="" width={64} height={64} unoptimized className="h-full w-full object-cover" /> : tool.logo}</div><div><Badge variant="info">{tool.category}</Badge><h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">{tool.name}</h1><p className="mt-2 text-slate-500">{tool.longDescription}</p></div></div><div className="mt-6 flex flex-wrap gap-3"><a href={tool.website} target="_blank" rel="noreferrer" className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white">Visit website</a><Link href={`/compare?tools=${tool.slug}`} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Compare</Link></div></div></div>;
}

export function ManagedBlogPage({ slug }: { slug: string }) {
  const items = usePublishedBlogs();
  const post = useMemo(() => items.find((item) => item.slug === slug), [items, slug]);
  if (!post) return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-slate-500">Loading managed article…</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm font-semibold text-primary-600">← All Guides</Link>
      <div className="mt-6 flex items-center gap-3">
        <Badge variant="info">{post.category}</Badge>
        <span className="text-xs text-slate-400">{post.readTime} · {post.date}</span>
      </div>
      <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{post.title}</h1>
      <div className="mt-3 mb-8 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>By {post.author}</span>
      </div>
      <p className="mt-3 text-slate-500">{post.excerpt}</p>
      {imageSource(post.image) && (
        <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <Image src={imageSource(post.image)} alt={post.title} width={1200} height={1200} unoptimized className="h-auto w-full object-contain" />
        </div>
      )}
      <article className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        {post.content.split("\n").map((line, index) => line.startsWith("## ") ? <h2 key={index}>{line.slice(3)}</h2> : line.startsWith("# ") ? <h1 key={index}>{line.slice(2)}</h1> : line.startsWith("- ") ? <li key={index}>{line.slice(2)}</li> : <p key={index}>{line || "\u00a0"}</p>)}
      </article>
    </div>
  );
}
