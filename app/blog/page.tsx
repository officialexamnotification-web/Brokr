import Link from "next/link";
import { ChevronLeft, Clock, ArrowRight, BookOpen, TrendingUp, DollarSign, Shield } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, blogPosts } from "@/lib/data";
import Badge from "@/components/common/Badge";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const categoryIcons: Record<string, React.ElementType> = {
  Forex: TrendingUp, Crypto: DollarSign, Stocks: TrendingUp, Education: BookOpen, CFD: Shield,
};

export default function BlogListPage() {
  const posts = getBlogPosts();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
        Trading <span className="gradient-text">Guides</span> &amp; Insights
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">Expert articles to help you become a better trader.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const Icon = categoryIcons[post.category] || BookOpen;
          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group glass-card rounded-3xl p-6 lg:p-8 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-lg font-bold text-primary-600">
                  {post.image}
                </div>
                <div>
                  <Badge variant="info">{post.category}</Badge>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
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
          );
        })}
      </div>
    </div>
  );
}
