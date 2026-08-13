import Link from "next/link";
import { ChevronLeft, Clock, ArrowRight, BookOpen, TrendingUp, DollarSign, Shield, Bitcoin, BarChart3, LineChart, GanttChart, Wallet, Wrench, GraduationCap } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, blogPosts, categories } from "@/lib/data";
import Badge from "@/components/common/Badge";
import type { Metadata } from "next";
import { ManagedBlogList } from "@/components/content/ManagedContent";

export const metadata: Metadata = {
  title: "Trading Guides & Educational Articles | Tradivex",
  description: "Educational trading guides and market explainers covering forex, crypto, stocks, and financial tools.",
  alternates: { canonical: "/blog" },
  keywords: "trading guides, forex education, crypto tutorials, stock market analysis, trading strategies, trading blog",
  openGraph: {
    title: "Trading Guides & Insights | Tradivex",
    description: "Educational articles with practical explanations of trading tools and markets.",
    type: "website",
    locale: "en_US",
    url: "/blog",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tradivex Trading Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Guides | Tradivex",
    description: "Learn trading concepts and market context from explanatory articles and guides.",
    images: ["/opengraph-image"],
  },
};

export function generateStaticParams() {
  return [];
}

const categoryIcons: Record<string, React.ElementType> = {
  "Forex Brokers": TrendingUp,
  "Crypto Exchanges": Bitcoin,
  "Stock Brokers": BarChart3,
  "CFD Brokers": LineChart,
  "Options Trading": GanttChart,
  "Payment Systems": Wallet,
  "Trading Tools": Wrench,
  "Education": GraduationCap,
};

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const posts = getBlogPosts();
  const filteredPosts = resolvedSearchParams.category 
    ? posts.filter(post => post.category === resolvedSearchParams.category)
    : posts;
  const allCategories = ["All", ...categories.map(c => c.name)];
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
        Trading <span className="gradient-text">Guides</span> &amp; Insights
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-3">Educational articles that explain trading tools, markets, and comparison context.</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-12">Editorial education only. Market facts, fees, regulations, and provider features can change, so always verify current details with official sources.</p>
      <div className="mb-8 rounded-2xl border border-primary-200 bg-primary-50/70 p-5 text-sm leading-relaxed text-primary-900 dark:border-primary-900/60 dark:bg-primary-950/20 dark:text-primary-200">
        Looking for an interactive estimate? Browse the <Link href="/calculators" className="font-semibold underline">free trading calculators</Link> and read the assumptions shown below each tool.
      </div>
      
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allCategories.map((category) => {
          const isActive = resolvedSearchParams.category === category || (category === "All" && !resolvedSearchParams.category);
          const href = category === "All" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`;
          
          return (
            <Link
              key={category}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary-600 text-white" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => {
          const Icon = categoryIcons[post.category] || BookOpen;
          const categorySlug = categories.find(c => c.name === post.category)?.slug;
          return (
            <article key={post.id} className="group glass-card rounded-3xl p-6 lg:p-8 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-lg font-bold text-primary-600">
                  {post.image}
                </div>
                <div>
                  <Link 
                    href={categorySlug ? `/category/${categorySlug}` : `/blog?category=${encodeURIComponent(post.category)}`}
                    className="inline-block hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer"
                  >
                    <Badge variant="info">{post.category}</Badge>
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{t}</span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">By {post.author}</span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <ManagedBlogList />
    </div>
  );
}
