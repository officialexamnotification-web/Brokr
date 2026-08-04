import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ExternalLink,
  ChevronLeft,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Check,
  Shield,
  Globe,
  Clock,
  Smartphone,
  Users,
  Wallet,
  MessageCircle,
  Star,
  ArrowUpRight,
  HelpCircle,
  Award,
  DollarSign,
  Zap,
  BarChart3,
} from "lucide-react";
import { getToolBySlug, getToolDataStatus, getToolLastVerified, getToolSourceUrls, tools } from "@/lib/data";
import Rating from "@/components/common/Rating";
import Badge from "@/components/common/Badge";
import ToolCard from "@/components/common/ToolCard";
import QuickCompareSidebar from "@/components/common/QuickCompareSidebar";
import RiskWarningBanner from "@/components/common/RiskWarningBanner";
import { getRelevantTools } from "@/lib/tool-relevance";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found | Tradivex" };
  return {
    title: `${tool.name} - Features, Fees & Availability | Tradivex`,
    description: `${tool.description} Review the public listing, availability, regulation labels, and provider details before using the service.`,
    keywords: [tool.name, tool.category, "trading tools", "platform comparison"],
    openGraph: {
      title: `${tool.name} | Tradivex Directory`,
      description: tool.description,
      type: "website",
    },
  };
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = getRelevantTools(tool, tools, 3);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.name,
    description: tool.longDescription,
    about: tool.category,
    isPartOf: { "@type": "WebSite", name: "Tradivex" },
    author: {
      "@type": "Organization",
      name: "Tradivex",
    },
  };

  const compareTools = getRelevantTools(tool, tools, 4);
  const comparisonKeys = [
    { label: "Rating", key: "rating" as const, format: (v: number | null) => v ? `${v}/5` : "Not available" },
    { label: "Pricing", key: "pricing" as const, format: (v: string) => v },
    { label: "Founded", key: "yearFounded" as const, format: (v: number) => String(v) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl p-6 lg:p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center shrink-0 ring-1 ring-indigo-200/50 dark:ring-indigo-800/50">
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{tool.logo}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">{tool.name}</h1>
                  {tool.trending && <TrendingUp className="w-5 h-5 text-emerald-500" />}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Rating value={tool.rating} size="md" />
                  <Badge variant="info">{tool.category}</Badge>
                  {tool.affiliate && <Badge variant="warning">Affiliate</Badge>}
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{tool.longDescription}</p>
                <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 p-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>Data status: {getToolDataStatus(tool).replace("_", " ")}</span>
                    <span>Last verified: {getToolLastVerified(tool) ?? "Not recorded"}</span>
                    <a href={getToolSourceUrls(tool)[0]} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                      Provider website
                    </a>
                  </div>
                  <p className="mt-1">Tradivex does not independently verify every listing. Confirm fees, licence details, eligibility, and availability before using a service.</p>
                </div>
              </div>
            </div>

            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">Catalog tags</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tool.bestFor.map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-900">
                  <Award className="w-3 h-3 inline mr-1" /> {b}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 px-6 py-3 text-sm">
                Visit Website <ExternalLink className="w-4 h-4" />
              </Link>
              <Link href={`/compare?tools=${tool.slug}`} className="btn-outline flex items-center gap-2 px-6 py-3 text-sm">
                Compare <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <RiskWarningBanner />

          <div className="glass-card rounded-3xl p-6 lg:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.features.map((f) => (
                <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-3xl p-6 lg:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-emerald-500" />
                </div>
                Listed highlights
              </h3>
              <ul className="space-y-3">
                {tool.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-3xl p-6 lg:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
                  <ThumbsDown className="w-4 h-4 text-rose-400" />
                </div>
                Listed considerations
              </h3>
              <ul className="space-y-3">
                {tool.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-rose-400 mt-0.5 shrink-0">&bull;</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {compareTools.length > 0 && (
            <div className="glass-card rounded-3xl p-6 lg:p-8 overflow-x-auto">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-500" /> Quick Comparison
              </h2>
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-500">Feature</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-primary-600 dark:text-primary-400">{tool.name}</th>
                    {compareTools.map((ct) => (
                      <th key={ct.id} className="text-left py-3 px-4 text-sm font-semibold text-slate-500">
                        <Link href={`/tool/${ct.slug}`} className="hover:text-primary-600 transition-colors">{ct.name}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonKeys.map((row) => (
                    <tr key={row.key} className="border-b border-slate-50 dark:border-slate-800/50">
                      <td className="py-3 px-4 text-sm text-slate-500">{row.label}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">{row.format(tool[row.key] as never)}</td>
                      {compareTools.map((ct) => (
                        <td key={ct.id} className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{row.format(ct[row.key] as never)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <Link href={`/compare?tools=${[tool.slug, ...compareTools.map((c) => c.slug)].join(",")}`} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-end gap-1">
                  Full Comparison <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {tool.faq.length > 0 && (
            <div className="glass-card rounded-3xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary-500" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {tool.faq.map((item, i) => (
                  <details key={i} className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
                      {item.q}
                      <ChevronLeft className="w-4 h-4 text-slate-400 group-open:-rotate-90 transition-transform shrink-0 ml-2" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Similar Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="glass-card rounded-3xl p-6 sticky top-24">
            <div className="space-y-4">
              {[
                { icon: DollarSign, label: "Pricing", value: tool.pricingDetail },
                { icon: Wallet, label: "Min Deposit", value: tool.minDeposit },
                { icon: Clock, label: "Founded", value: String(tool.yearFounded) },
                { icon: Smartphone, label: "Mobile App", value: tool.mobileApp ? "Yes" : "No" },
                { icon: BarChart3, label: "Demo Account", value: tool.demoAccount ? "Yes" : "No" },
                { icon: Clock, label: "Withdrawal", value: tool.withdrawalTime },
                { icon: MessageCircle, label: "Support", value: tool.customerSupport },
              ].map((item) => (
                <div key={item.label} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{item.label}</span>
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">{item.value}</div>
                </div>
              ))}

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Regulation</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.regulation.map((r) => (
                    <span key={r} className="px-2 py-1 text-xs rounded-lg bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400 font-medium">{r}</span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  Licence number and legal-entity verification: {tool.regulatoryEntities?.length ? "provided in the record" : "not recorded"}. Check the regulator directly.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Platforms</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.platforms.map((p) => (
                    <span key={p} className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">{p}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Deposit Methods</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.depositMethods.map((m) => (
                    <span key={m} className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickCompareSidebar currentTool={tool} />
    </div>
    </>
  );
}
