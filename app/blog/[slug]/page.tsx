import Link from "next/link";
import { ChevronLeft, Clock, ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import Badge from "@/components/common/Badge";
import ShareButton from "@/components/common/ShareButton";
import type { Metadata } from "next";
import { ManagedBlogPage } from "@/components/content/ManagedContent";
import { getPublishedManagedBlog } from "@/lib/managed-blog-server";
import { calculatorDefinitions, type CalculatorSlug } from "@/lib/calculators";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tradivex.com").replace(/\/$/, "");

const calculatorLinksByCategory: Record<string, string[]> = {
  "Risk Management": ["risk-reward", "position-size", "drawdown-recovery", "net-trading-cost"],
  Forex: ["pip-value", "position-size", "forex-pnl", "forex-margin"],
  Options: ["options-payoff", "options-strategy", "options-probability"],
  Stocks: ["stock-profit", "dividend-drip", "us-capital-gains"],
  Crypto: ["crypto-liquidation", "dca-average-price", "net-trading-cost"],
};

function getRelatedCalculatorSlugs(category: string) {
  return calculatorLinksByCategory[category] ?? ["position-size", "risk-reward", "net-trading-cost"];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  const managedPost = post ? null : await getPublishedManagedBlog(params.slug);
  const resolvedPost = post ?? managedPost;

  if (!resolvedPost) {
    return {
      title: "Trading Article | Tradivex",
      description: "Educational trading articles and market explainers from Tradivex.",
    };
  }

  return {
    title: `${resolvedPost.title} | ${resolvedPost.category} Guide | Tradivex`,
    description: resolvedPost.excerpt,
    keywords: `${resolvedPost.tags.join(", ")}, ${resolvedPost.category}, trading guide, ${resolvedPost.title}`,
    alternates: { canonical: `/blog/${resolvedPost.slug}` },
    openGraph: {
      title: resolvedPost.title,
      description: resolvedPost.excerpt,
      type: "article",
      locale: "en_US",
      url: `/blog/${resolvedPost.slug}`,
      publishedTime: resolvedPost.date,
      authors: [resolvedPost.author],
      section: resolvedPost.category,
      tags: resolvedPost.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedPost.title,
      description: resolvedPost.excerpt,
    },
  };
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    const managedPost = await getPublishedManagedBlog(params.slug);
    return <ManagedBlogPage slug={params.slug} initialPost={managedPost} />;
  }

  const relatedPosts = getBlogPosts().filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const calculatorBySlug = new Map(calculatorDefinitions.map((calculator) => [calculator.slug, calculator]));
  const relatedCalculators = getRelatedCalculatorSlugs(post.category)
    .map((slug) => calculatorBySlug.get(slug as CalculatorSlug))
    .filter((calculator): calculator is (typeof calculatorDefinitions)[number] => Boolean(calculator));
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastReviewedAt ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Tradivex" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Guides
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <Badge variant="info">{post.category}</Badge>
        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
        <span className="text-xs text-slate-400">{post.date}</span>
      </div>

      <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight leading-tight">{post.title}</h1>
      <div className="flex items-center gap-4 mb-8 text-sm text-slate-500">
        <span>By {post.author}</span>
        <ShareButton title={post.title} />
      </div>

      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-300">
        <div>Editorial review: {post.lastReviewedAt ?? "Not recorded"} · {post.reviewStatus === "source_checked" ? "Source checked" : "General educational content"}</div>
        <p className="mt-1">Fees, regulations, availability, market data and provider features can change. Verify current details with the relevant provider or regulator. This article is not financial advice.</p>
      </div>

      {post.sourceUrls && post.sourceUrls.length > 0 && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Sources to verify</h2>
          <ul className="space-y-1.5 list-disc pl-4">
            {post.sourceUrls.map((url) => <li key={url}><a href={url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline break-all">{url}</a></li>)}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">{t}</span>
        ))}
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600 prose-strong:text-slate-900 dark:prose-strong:text-white">
        {post.content.split("\n").map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-black mt-10 mb-4">{line.replace("# ", "")}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">{line.replace("## ", "")}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-bold mt-6 mb-2 text-slate-800 dark:text-slate-200">{line.replace("### ", "")}</h3>;
          if (line.startsWith("|")) {
            const cells = line.split("|").filter(Boolean).map((c) => c.trim());
            if (cells.every((c) => c.match(/^-+$/))) return <hr key={i} className="my-2 border-slate-200 dark:border-slate-700" />;
            if (cells.some((c) => c.startsWith("**"))) {
              return (
                <div key={i} className="flex gap-4 py-2 border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white">
                  {cells.map((c, j) => <span key={j} className="flex-1">{c.replace(/\*\*/g, "")}</span>)}
                </div>
              );
            }
            return (
              <div key={i} className="flex gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
                {cells.map((c, j) => <span key={j} className="flex-1">{c}</span>)}
              </div>
            );
          }
          if (line.startsWith("- ")) return <li key={i} className="text-slate-600 dark:text-slate-400 ml-4 list-disc">{line.replace("- ", "")}</li>;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{line}</p>;
        })}
      </article>

      {relatedCalculators.length > 0 && (
        <div className="mt-12 rounded-2xl border border-primary-200 bg-primary-50/60 p-5 dark:border-primary-900/60 dark:bg-primary-950/20">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Useful calculators for this topic</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedCalculators.map((calculator) => (
              <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-primary-700 shadow-sm hover:underline dark:bg-slate-900 dark:text-primary-300">
                {calculator.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} href={`/blog/${rp.slug}`} className="glass-card rounded-2xl p-5 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-sm font-bold text-primary-600">
                    {rp.image}
                  </div>
                  <span className="text-xs text-slate-400">{rp.readTime} read</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary-600 transition-colors">{rp.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
