"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  GitCompare,
  PlusCircle,
  Command,
  Sparkles,
  Zap,
  ArrowUpRight,
  Layers,
  BarChart3,
  LineChart,
  Bitcoin,
  Wallet,
  BookOpen,
  Globe,
  MessageCircle,
} from "lucide-react";

interface NavChild {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ElementType;
}

const megaMenu: Record<string, NavChild[]> = {
  Categories: [
    { label: "Forex Brokers", href: "/category/1", desc: "FX & currency trading", icon: TrendingUp },
    { label: "Crypto Exchanges", href: "/category/2", desc: "Bitcoin & altcoins", icon: Bitcoin },
    { label: "Stock Brokers", href: "/category/3", desc: "Equities & ETFs", icon: BarChart3 },
    { label: "CFD Brokers", href: "/category/4", desc: "Contracts for difference", icon: LineChart },
    { label: "Trading Tools", href: "/category/7", desc: "Platforms & software", icon: Layers },
    { label: "Payment Systems", href: "/category/6", desc: "E-wallets & payments", icon: Wallet },
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#", mega: "Categories" },
  { label: "Compare", href: "/compare", icon: GitCompare },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Submit", href: "/submit", icon: PlusCircle },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLink, setActiveLink] = useState("/");
  const [logoHovered, setLogoHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMegaOpen(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMegaEnter = (key: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(key);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(null), 200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const logoVariants = {
    idle: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-2xl shadow-slate-200/20 dark:shadow-black/30 border-b border-slate-200/30 dark:border-slate-800/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2.5 shrink-0 group"
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
              >
                <motion.div
                  variants={logoVariants}
                  animate={logoHovered ? "hover" : "idle"}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <TrendingUp className="w-5 h-5 text-white relative z-10" />
                </motion.div>
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Brokr
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive = link.href === "/" ? activeLink === "/" : activeLink.startsWith(link.href) && link.href !== "/";
                  return link.mega ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => handleMegaEnter(link.mega!)}
                      onMouseLeave={handleMegaLeave}
                    >
                      <button
                        className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                          megaOpen === link.mega
                            ? "text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-950/50"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: megaOpen === link.mega ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                        {megaOpen === link.mega && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {megaOpen === link.mega && (
                          <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] glass rounded-3xl shadow-2xl shadow-slate-500/10 dark:shadow-black/30 p-4 z-50 overflow-hidden"
                            onMouseEnter={() => handleMegaEnter(link.mega!)}
                            onMouseLeave={handleMegaLeave}
                          >
                            <div className="absolute inset-0 mesh-bg opacity-50" />
                            <div className="relative grid grid-cols-2 gap-1">
                              {megaMenu[link.mega!].map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all group/item"
                                >
                                  {item.icon && (
                                    <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                      <item.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                                      {item.label}
                                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                    </div>
                                    {item.desc && (
                                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {item.desc}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="relative mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200/30 dark:border-indigo-800/30">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-bold text-slate-900 dark:text-white">Can&apos;t find what you need?</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Browse all 250+ tools in our directory</div>
                                </div>
                                <Link
                                  href="/search"
                                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:shadow-md transition-all flex items-center gap-1.5"
                                >
                                  View All <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-950/50"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 glass rounded-xl hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-black/20 hover:text-slate-700 dark:hover:text-slate-200 transition-all group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline">Quick search...</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] rounded-lg bg-slate-200/60 dark:bg-slate-700/60 text-slate-400 dark:text-slate-500 font-mono font-medium border border-slate-300/50 dark:border-slate-600/50">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>

              {/* Chatbot indicator - Tawk.to widget loads automatically */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Support</span>
              </div>

              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.9, rotate: -15 }}
                className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all relative"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden glass border-t border-slate-200/30 dark:border-slate-800/30 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                <form onSubmit={handleSearch} className="mb-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tools..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    />
                  </div>
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Categories
                  </div>
                  {megaMenu.Categories.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.icon && (
                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                          <item.icon className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                        </div>
                      )}
                      <div>
                        <div>{item.label}</div>
                        {item.desc && (
                          <div className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <div className="glass rounded-3xl p-3 shadow-2xl shadow-slate-500/10 dark:shadow-black/30 border border-slate-200/30 dark:border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400 ml-3" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search brokers, exchanges, tools..."
                      className="flex-1 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none"
                    />
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs rounded-lg bg-slate-200/60 dark:bg-slate-700/60 text-slate-400 dark:text-slate-500 font-mono border border-slate-300/50 dark:border-slate-600/50">
                      ESC
                    </kbd>
                  </div>
                  {searchQuery && (
                    <div className="border-t border-slate-200/50 dark:border-slate-700/50 mt-2 pt-2">
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-xs text-slate-400">Press Enter to search</span>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              <div className="mt-3 px-4 flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 dark:text-slate-500">Popular:</span>
                {["eToro", "Binance", "MetaTrader", "TradingView", "Coinbase"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      router.push(`/search?q=${term}`);
                      setSearchOpen(false);
                    }}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
