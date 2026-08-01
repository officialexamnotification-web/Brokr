import React from "react";
import Link from "next/link";
import { TrendingUp, Twitter, Github, Mail, Heart, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Categories: [
    { label: "Forex Brokers", href: "/category/1" },
    { label: "Crypto Exchanges", href: "/category/2" },
    { label: "Stock Brokers", href: "/category/3" },
    { label: "CFD Brokers", href: "/category/4" },
    { label: "Trading Tools", href: "/category/7" },
  ],
  Features: [
    { label: "Compare Tools", href: "/compare" },
    { label: "Submit a Tool", href: "/submit" },
    { label: "Blog", href: "/blog" },
    { label: "Latest Reviews", href: "/search?sort=latest" },
    { label: "Top Rated", href: "/search?sort=rating" },
  ],
  Regions: [
    { label: "India", href: "/region/in" },
    { label: "United Kingdom", href: "/region/uk" },
    { label: "United States", href: "/region/us" },
    { label: "European Union", href: "/region/eu" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Methodology", href: "/methodology" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Brokr
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-sm">
              Your trusted companion for finding and comparing the best trading
              platforms. Independent reviews, detailed comparisons and real user
              ratings.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary-500 hover:border-primary-200 dark:hover:border-primary-800 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Brokr. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-md">
            Disclaimer: This website is for informational purposes only and does not constitute financial advice. Trading involves significant risk of loss. Please consult a licensed financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
