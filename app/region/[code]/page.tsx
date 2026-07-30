import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Shield, Globe, TrendingUp, Check, ArrowRight, ExternalLink } from "lucide-react";
import { getRegionByCode, getToolsByRegion, regions } from "@/lib/data";
import ToolCard from "@/components/common/ToolCard";
import Badge from "@/components/common/Badge";

export function generateStaticParams() {
  return regions.map((r) => ({ code: r.code }));
}

export default function RegionPage({ params }: { params: { code: string } }) {
  const region = getRegionByCode(params.code);
  if (!region) notFound();

  const regionTools = getToolsByRegion(params.code);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="glass-card rounded-3xl p-8 lg:p-12 mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center ring-1 ring-indigo-200/50 dark:ring-indigo-800/50">
            <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">Best Trading Platforms in {region.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              {region.regulations.map((r) => (
                <Badge key={r} variant="info">{r}</Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-6">{region.description}</p>
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/50">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Quick Tips for {region.name} Traders
          </h3>
          <ul className="space-y-2">
            {region.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300">
                <Check className="w-4 h-4 mt-0.5 shrink-0" /> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {regionTools.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-500" /> Recommended Tools for {region.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/search" className="btn-primary inline-flex items-center gap-2">
          Browse All Tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
