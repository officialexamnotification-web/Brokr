"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/data";
import {
  listManagedBlogs,
  listManagedTools,
  listToolSubmissions,
  removeManagedContent,
  saveManagedBlog,
  saveManagedTool,
  splitList,
  toolFromSubmission,
  updateToolSubmission,
  uploadManagedImage,
  type ManagedBlogPost,
  type ManagedTool,
  type ToolSubmission,
} from "@/lib/admin-content";
import { getFirebaseAuth, getFirebaseFirestore, isFirebaseConfigured } from "@/lib/firebase";
import { useTheme } from "@/components/layout/ThemeProvider";
import { FileText, LayoutDashboard, LogOut, Moon, PackageSearch, Plus, Send, ShieldCheck, Sparkles, Sun, Wrench } from "lucide-react";

type Tab = "overview" | "submissions" | "tools" | "blogs";

type ToolFormState = {
  name: string;
  slug: string;
  website: string;
  categoryId: string;
  description: string;
  longDescription: string;
  logo: string;
  imageUrl: string;
  pricing: string;
  pricingDetail: string;
  minDeposit: string;
  platforms: string;
  features: string;
  pros: string;
  cons: string;
  regulation: string;
  supportedCountries: string;
  bestFor: string;
  status: "draft" | "published";
  featured: boolean;
  trending: boolean;
};

type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string;
  status: "draft" | "published";
};

const emptyTool: ToolFormState = {
  name: "", slug: "", website: "", categoryId: "7", description: "", longDescription: "", logo: "",
  imageUrl: "", pricing: "", pricingDetail: "", minDeposit: "", platforms: "Web", features: "", pros: "", cons: "",
  regulation: "", supportedCountries: "Global", bestFor: "", status: "draft", featured: false, trending: false,
};

function localDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

const emptyBlog: BlogFormState = {
  title: "", slug: "", excerpt: "", content: "", category: "Education", author: "Tradivex Editorial Team",
  date: localDate(), readTime: "5 min", imageUrl: "", tags: "", status: "draft",
};

function toToolForm(tool: ManagedTool): ToolFormState {
  return {
    name: String(tool.name ?? ""), slug: String(tool.slug ?? ""), website: String(tool.website ?? ""),
    categoryId: String(tool.categoryId ?? 7), description: String(tool.description ?? ""),
    longDescription: String(tool.longDescription ?? tool.description ?? ""), logo: String(tool.logo ?? ""),
    imageUrl: String(tool.imageUrl ?? ""), pricing: String(tool.pricing ?? ""), pricingDetail: String(tool.pricingDetail ?? ""),
    minDeposit: String(tool.minDeposit ?? ""), platforms: splitList(tool.platforms).join(", "), features: splitList(tool.features).join(", "),
    pros: splitList(tool.pros).join(", "), cons: splitList(tool.cons).join(", "), regulation: splitList(tool.regulation).join(", "),
    supportedCountries: splitList(tool.supportedCountries).join(", "), bestFor: splitList(tool.bestFor).join(", "),
    status: tool.status ?? "draft", featured: Boolean(tool.featured), trending: Boolean(tool.trending),
  };
}

function toBlogForm(blog: ManagedBlogPost): BlogFormState {
  return {
    title: String(blog.title ?? ""), slug: String(blog.slug ?? ""), excerpt: String(blog.excerpt ?? ""),
    content: String(blog.content ?? ""), category: String(blog.category ?? "Education"), author: String(blog.author ?? "Tradivex Editorial Team"),
    date: String(blog.date ?? localDate()), readTime: String(blog.readTime ?? "5 min"),
    imageUrl: String(blog.imageUrl ?? blog.image ?? ""), tags: splitList(blog.tags).join(", "), status: blog.status ?? "draft",
  };
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={wide ? "block md:col-span-2" : "block"}><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>{children}</label>;
}

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";
const textareaClass = `${inputClass} min-h-28 resize-y`;

export default function AdminPanel() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [tools, setTools] = useState<ManagedTool[]>([]);
  const [blogs, setBlogs] = useState<ManagedBlogPost[]>([]);
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
  const [toolDocId, setToolDocId] = useState<string | null>(null);
  const [blogDocId, setBlogDocId] = useState<string | null>(null);
  const [toolForm, setToolForm] = useState<ToolFormState>(emptyTool);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlog);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const refresh = async () => {
    const results = await Promise.allSettled([
      listManagedTools().catch((cause) => { throw new Error(`Managed tools: ${cause instanceof Error ? cause.message : "permission denied"}`); }),
      listManagedBlogs().catch((cause) => { throw new Error(`Managed blogs: ${cause instanceof Error ? cause.message : "permission denied"}`); }),
      listToolSubmissions().catch((cause) => { throw new Error(`Submissions: ${cause instanceof Error ? cause.message : "permission denied"}`); }),
    ]);
    const [toolsResult, blogsResult, submissionsResult] = results;
    if (toolsResult.status === "fulfilled") setTools(toolsResult.value);
    if (blogsResult.status === "fulfilled") setBlogs(blogsResult.value);
    if (submissionsResult.status === "fulfilled") setSubmissions(submissionsResult.value);
    const failed = results.find((result) => result.status === "rejected");
    if (failed?.status === "rejected") throw new Error(failed.reason instanceof Error ? failed.reason.message : "Could not load Firebase content.");
    setError("");
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    const db = getFirebaseFirestore();
    if (!auth || !db) {
      setError("Firebase configuration is missing.");
      setChecking(false);
      return;
    }
    return onAuthStateChanged(auth, async (nextUser) => {
      if (!nextUser?.email) {
        setChecking(false);
        router.replace("/admin/login");
        return;
      }
      try {
        setUser(nextUser);
        await nextUser.getIdToken(true);
        await new Promise((resolve) => window.setTimeout(resolve, 500));
        await refresh();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not load the admin panel.");
      } finally {
        setChecking(false);
      }
    });
  }, [router]);

  const pendingCount = useMemo(() => submissions.filter((item) => item.status === "pending-review").length, [submissions]);

  const showMessage = (message: string) => {
    setError("");
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
    router.replace("/admin/login");
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>, kind: "tools" | "blogs") => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setError("Please choose an image under 10 MB.");
      return;
    }
    setBusy(true);
    try {
      const url = await uploadManagedImage(file, kind);
      if (kind === "tools") setToolForm((current) => ({ ...current, imageUrl: url }));
      else setBlogForm((current) => ({ ...current, imageUrl: url }));
      showMessage("Image uploaded.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Image upload failed.");
    } finally {
      setBusy(false);
    }
  };

  const saveTool = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const category = categories.find((item) => item.id === Number(toolForm.categoryId)) ?? categories[6];
      const payload = {
        id: toolDocId ? undefined : Date.now(), name: toolForm.name.trim(), slug: slugify(toolForm.slug || toolForm.name), website: toolForm.website.trim(),
        logo: toolForm.logo.trim() || toolForm.name.slice(0, 2).toUpperCase(), imageUrl: toolForm.imageUrl.trim(), rating: null,
        description: toolForm.description.trim(), longDescription: toolForm.longDescription.trim() || toolForm.description.trim(), category: category.name, categoryId: category.id,
        features: splitList(toolForm.features), pros: splitList(toolForm.pros), cons: splitList(toolForm.cons), pricing: toolForm.pricing.trim(), pricingDetail: toolForm.pricingDetail.trim(),
        minDeposit: toolForm.minDeposit.trim(), platforms: splitList(toolForm.platforms), websiteUrl: toolForm.website.trim(), affiliate: false, trending: toolForm.trending, featured: toolForm.featured,
        yearFounded: new Date().getFullYear(), regulation: splitList(toolForm.regulation), supportedCountries: splitList(toolForm.supportedCountries), depositMethods: [], withdrawalTime: "Provider-dependent",
        customerSupport: "Provider-dependent", mobileApp: false, demoAccount: false, faq: [], bestFor: splitList(toolForm.bestFor), sourceUrls: toolForm.website ? [toolForm.website.trim()] : [], dataStatus: "unverified", status: toolForm.status,
      };
      await saveManagedTool(toolDocId, payload);
      await refresh();
      setToolDocId(null);
      setToolForm(emptyTool);
      showMessage("Tool saved successfully.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tool could not be saved.");
    } finally {
      setBusy(false);
    }
  };

  const saveBlog = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await saveManagedBlog(blogDocId, {
        id: blogDocId ? undefined : Date.now(), title: blogForm.title.trim(), slug: slugify(blogForm.slug || blogForm.title), excerpt: blogForm.excerpt.trim(),
        content: blogForm.content, category: blogForm.category.trim(), author: blogForm.author.trim() || "Tradivex Editorial Team", date: blogForm.date, readTime: blogForm.readTime.trim() || "5 min",
        image: blogForm.imageUrl.trim() || blogForm.title.slice(0, 2).toUpperCase(), imageUrl: blogForm.imageUrl.trim(), tags: splitList(blogForm.tags), status: blogForm.status,
      });
      await refresh();
      setBlogDocId(null);
      setBlogForm(emptyBlog);
      showMessage("Blog post saved successfully.");
    } catch (cause) {
      const code = typeof cause === "object" && cause !== null && "code" in cause ? ` (${String((cause as { code?: unknown }).code)})` : "";
      setError(`${cause instanceof Error ? cause.message : "Blog post could not be saved."}${code}`);
    } finally {
      setBusy(false);
    }
  };

  const deleteContent = async (kind: "tool" | "blog", docId: string) => {
    if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await removeManagedContent(kind === "tool" ? "managedTools" : "managedBlogs", docId);
      await refresh();
      showMessage(`${kind === "tool" ? "Tool" : "Blog post"} deleted.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  };

  const publishSubmission = async (submission: ToolSubmission) => {
    setBusy(true);
    try {
      const draft = toolFromSubmission(submission);
      await saveManagedTool(null, draft);
      await updateToolSubmission(submission.docId, "approved");
      await refresh();
      showMessage("Submission converted into a draft tool.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not approve submission.");
    } finally {
      setBusy(false);
    }
  };

  if (checking) return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-slate-500">Checking secure admin access…</div>;
  if (!user) return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-rose-600">{error || "Redirecting to secure login…"}</div>;

  const nav: Array<{ id: Tab; label: string; count?: number; icon: typeof LayoutDashboard }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "submissions", label: "Submissions", count: pendingCount, icon: Send },
    { id: "tools", label: "Tools", count: tools.length, icon: Wrench },
    { id: "blogs", label: "Blogs", count: blogs.length, icon: FileText },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200/70 bg-white/65 p-5 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/65 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-violet-500 to-cyan-400 text-lg font-black text-white shadow-lg shadow-primary-500/20">T</div>
            <div><p className="text-base font-black tracking-tight text-slate-900 dark:text-white">Tradivex</p><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Admin Studio</p></div>
          </div>
          <div className="mt-8 hidden text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 lg:block">Workspace</div>
          <nav className="mt-3 flex gap-2 overflow-x-auto lg:block lg:space-y-2">
            {nav.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setTab(item.id)} className={`group flex min-w-fit items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all lg:w-full ${tab === item.id ? "bg-gradient-to-r from-primary-600 to-violet-600 text-white shadow-lg shadow-primary-500/20" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"}`}><Icon className={`h-4 w-4 ${tab === item.id ? "text-white" : "text-slate-400 group-hover:text-primary-500"}`} /><span>{item.label}</span>{item.count !== undefined && <span className={`ml-auto rounded-full px-2 py-0.5 text-[11px] ${tab === item.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{item.count}</span>}</button>; })}
          </nav>
          <div className="mt-8 hidden rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-cyan-50 p-4 dark:border-primary-900/50 dark:from-primary-950/40 dark:to-cyan-950/20 lg:block"><Sparkles className="h-5 w-5 text-primary-600" /><p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">Editorial control</p><p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Review submissions, publish trusted content, and keep the directory current.</p></div>
          <div className="mt-8 hidden items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 lg:flex"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><ShieldCheck className="h-4 w-4" /></div><div className="min-w-0"><p className="truncate text-xs font-bold text-slate-900 dark:text-white">Secure workspace</p><p className="text-[11px] text-slate-500">Firebase protected</p></div></div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <header className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-600">Private management console</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{tab === "overview" ? "Good to see you" : nav.find((item) => item.id === tab)?.label}</h1><p className="mt-1 text-sm text-slate-500">Manage Tradivex content from one focused workspace.</p></div><div className="flex items-center gap-2"><button onClick={toggleTheme} aria-label="Toggle theme" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-500 transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button><div className="hidden rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-right dark:border-slate-800 dark:bg-slate-900/70 sm:block"><p className="max-w-[190px] truncate text-xs font-bold text-slate-700 dark:text-slate-200">{user.email}</p><p className="text-[11px] text-emerald-600">Administrator</p></div><button onClick={handleLogout} aria-label="Sign out" className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Sign out</span></button></div></header>
          {(notice || error) && <div role={error ? "alert" : "status"} className={`mb-5 rounded-2xl border px-4 py-3 text-sm shadow-sm ${error ? "border-rose-200 bg-rose-50/90 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300" : "border-emerald-200 bg-emerald-50/90 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"}`}>{error || notice}</div>}
          {!isFirebaseConfigured && <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">Firebase configuration is missing from the deployment environment.</div>}

          {tab === "overview" && <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><Stat label="Pending submissions" value={pendingCount} tone="amber" icon={Send} /><Stat label="Managed tools" value={tools.length} tone="indigo" icon={Wrench} /><Stat label="Managed blogs" value={blogs.length} tone="cyan" icon={FileText} /></div><div className="glass-card card-3d rounded-3xl p-6"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950/50 dark:text-primary-300"><PackageSearch className="h-4 w-4" /></div><h2 className="text-lg font-black text-slate-900 dark:text-white">Publishing workflow</h2></div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">Public “Submit a Tool” entries arrive as pending submissions. Approve them into drafts, complete the details, upload imagery, then publish when the listing is ready.</p></div><div className="rounded-2xl bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{pendingCount > 0 ? `${pendingCount} item${pendingCount === 1 ? "" : "s"} need review` : "All caught up"}</div></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><WorkflowStep index="01" title="Review" text="Check incoming submissions" /><WorkflowStep index="02" title="Refine" text="Edit facts and imagery" /><WorkflowStep index="03" title="Publish" text="Make approved content live" /></div></div></div>}

          {tab === "submissions" && <section><SectionTitle title="Tool submissions" description="Review public submissions before they appear in the directory." /><div className="space-y-3">{submissions.length === 0 ? <Empty label="No submissions yet." icon={Send} /> : submissions.map((submission) => <div key={submission.docId} className="glass-card hover-lift rounded-2xl p-5"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-slate-900 dark:text-white">{submission.name}</h2><StatusBadge status={submission.status} /></div><p className="mt-1 text-sm text-slate-500">{submission.category} · {submission.email || "No email"}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{submission.description}</p><a className="mt-2 block text-sm font-semibold text-primary-600 hover:underline" href={submission.website} target="_blank" rel="noreferrer">{submission.website}</a></div><div className="flex h-fit gap-2">{submission.status === "pending-review" && <button disabled={busy} onClick={() => publishSubmission(submission)} className="btn-primary !rounded-xl !px-3 !py-2 text-xs">Approve as draft</button>}</div></div></div>)}</div></section>}

          {tab === "tools" && <section><SectionTitle title="Managed tools" description="Create and maintain tools stored in Firebase." action={<button onClick={() => { setToolDocId(""); setToolForm(emptyTool); }} className="btn-primary !rounded-xl !px-4 !py-2.5 text-sm"><Plus className="mr-1.5 inline h-4 w-4" /> New tool</button>} /><div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,1.4fr)]">{(toolDocId !== null || toolForm.name || toolForm.website) && <ToolEditor form={toolForm} setForm={setToolForm} busy={busy} onSave={saveTool} onCancel={() => { setToolDocId(null); setToolForm(emptyTool); }} onUpload={(event) => uploadImage(event, "tools")} />}{toolDocId === null && !toolForm.name && !toolForm.website && <div className="glass-card rounded-3xl border-dashed p-10 text-center text-sm text-slate-500 lg:col-span-2 dark:text-slate-400"><Wrench className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" /><p className="mt-3 font-semibold">Select “New tool” or edit an existing record.</p><p className="mt-1 text-xs">Published tools will appear in the public directory.</p></div>}<div className="space-y-3">{tools.length === 0 ? <Empty label="No managed tools yet." icon={Wrench} /> : tools.map((tool) => <ContentRow key={tool.docId} title={String(tool.name ?? "Untitled tool")} meta={`${tool.status} · ${tool.category ?? "Uncategorized"}`} image={tool.imageUrl} onEdit={() => { setToolDocId(tool.docId); setToolForm(toToolForm(tool)); }} onDelete={() => deleteContent("tool", tool.docId)} />)}</div></div></section>}

          {tab === "blogs" && <section><SectionTitle title="Managed blogs" description="Write, upload, publish and maintain blog articles." action={<button onClick={() => { setBlogDocId(""); setBlogForm(emptyBlog); }} className="btn-primary !rounded-xl !px-4 !py-2.5 text-sm"><Plus className="mr-1.5 inline h-4 w-4" /> New blog post</button>} /><div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,1.4fr)]">{(blogDocId !== null || blogForm.title || blogForm.content) && <BlogEditor form={blogForm} setForm={setBlogForm} busy={busy} onSave={saveBlog} onCancel={() => { setBlogDocId(null); setBlogForm(emptyBlog); }} onUpload={(event) => uploadImage(event, "blogs")} />}{blogDocId === null && !blogForm.title && !blogForm.content && <div className="glass-card rounded-3xl border-dashed p-10 text-center text-sm text-slate-500 lg:col-span-2 dark:text-slate-400"><FileText className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" /><p className="mt-3 font-semibold">Select “New blog post” or edit an existing record.</p><p className="mt-1 text-xs">Drafts stay private until you publish them.</p></div>}<div className="space-y-3">{blogs.length === 0 ? <Empty label="No managed blogs yet." icon={FileText} /> : blogs.map((blog) => <ContentRow key={blog.docId} title={String(blog.title ?? "Untitled blog")} meta={`${blog.status} · ${blog.category ?? "Uncategorized"}`} image={blog.imageUrl ?? String(blog.image ?? "")} onEdit={() => { setBlogDocId(blog.docId); setBlogForm(toBlogForm(blog)); }} onDelete={() => deleteContent("blog", blog.docId)} />)}</div></div></section>}
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value, tone, icon: Icon }: { label: string; value: number; tone: "amber" | "indigo" | "cyan"; icon: React.ComponentType<{ className?: string }> }) {
  const tones = {
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  };
  return <div className="glass-card hover-lift rounded-3xl p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p><p className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p></div><div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}><Icon className="h-5 w-5" /></div></div><p className="mt-4 text-xs font-semibold text-slate-400">Live Firebase records</p></div>;
}
function SectionTitle({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) { return <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action}</div>; }
function WorkflowStep({ index, title, text }: { index: string; title: string; text: string }) { return <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4 dark:border-slate-800/80 dark:bg-slate-950/40"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 text-[11px] font-black text-white">{index}</span><div><p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{text}</p></div></div></div>; }
function StatusBadge({ status }: { status?: string }) { const styles: Record<string, string> = { "pending-review": "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300", approved: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300", draft: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" }; return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${styles[status ?? ""] ?? styles.draft}`}>{(status ?? "draft").replace("-", " ")}</span>; }
function Empty({ label, icon: Icon }: { label: string; icon?: React.ComponentType<{ className?: string }> }) { return <div className="glass-card rounded-3xl border-dashed p-10 text-center text-sm text-slate-500 dark:text-slate-400">{Icon && <Icon className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />}<p className="mt-3 font-semibold">{label}</p><p className="mt-1 text-xs text-slate-400">Your workspace will show new records here.</p></div>; }
function ContentRow({ title, meta, image, onEdit, onDelete }: { title: string; meta: string; image?: string; onEdit: () => void; onDelete: () => void }) { const imageSource = image && (/^(https?:|data:image\/|\/)/.test(image) ? image : ""); return <div className="glass-card hover-lift flex items-center gap-3 rounded-2xl p-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-50 text-xs font-black text-primary-600 dark:bg-primary-950/30">{imageSource ? <Image src={imageSource} alt="" width={48} height={48} unoptimized className="h-full w-full object-cover" /> : image || "TX"}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-900 dark:text-white">{title}</p><p className="text-xs text-slate-500">{meta}</p></div><div className="flex shrink-0 gap-1"><button onClick={onEdit} className="rounded-xl px-3 py-2 text-xs font-bold text-primary-600 transition hover:bg-primary-50 dark:hover:bg-primary-950/30">Edit</button><button onClick={onDelete} className="rounded-xl px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-950/30">Delete</button></div></div>; }

function ToolEditor({ form, setForm, busy, onSave, onCancel, onUpload }: { form: ToolFormState; setForm: React.Dispatch<React.SetStateAction<ToolFormState>>; busy: boolean; onSave: (event: FormEvent) => void; onCancel: () => void; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  const update = (key: keyof ToolFormState, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  return <form onSubmit={onSave} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="mb-4 flex items-center justify-between"><h3 className="font-black text-slate-900 dark:text-white">Tool editor</h3><button type="button" onClick={onCancel} className="text-xs font-bold text-slate-500">Close</button></div><div className="grid gap-4 md:grid-cols-2"><Field label="Name"><input required className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} /></Field><Field label="Slug"><input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="generated-from-name" /></Field><Field label="Website"><input required type="url" className={inputClass} value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" /></Field><Field label="Category"><select className={inputClass} value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><Field label="Short description" wide><textarea required className={textareaClass} value={form.description} onChange={(e) => update("description", e.target.value)} /></Field><Field label="Long description" wide><textarea className={textareaClass} value={form.longDescription} onChange={(e) => update("longDescription", e.target.value)} /></Field><Field label="Pricing"><input className={inputClass} value={form.pricing} onChange={(e) => update("pricing", e.target.value)} /></Field><Field label="Pricing details"><input className={inputClass} value={form.pricingDetail} onChange={(e) => update("pricingDetail", e.target.value)} /></Field><Field label="Features (comma separated)"><input className={inputClass} value={form.features} onChange={(e) => update("features", e.target.value)} /></Field><Field label="Platforms (comma separated)"><input className={inputClass} value={form.platforms} onChange={(e) => update("platforms", e.target.value)} /></Field><Field label="Regulation"><input className={inputClass} value={form.regulation} onChange={(e) => update("regulation", e.target.value)} /></Field><Field label="Supported countries"><input className={inputClass} value={form.supportedCountries} onChange={(e) => update("supportedCountries", e.target.value)} /></Field><Field label="Pros"><textarea className={textareaClass} value={form.pros} onChange={(e) => update("pros", e.target.value)} placeholder="comma separated" /></Field><Field label="Considerations"><textarea className={textareaClass} value={form.cons} onChange={(e) => update("cons", e.target.value)} placeholder="comma separated" /></Field><Field label="Image URL"><input className={inputClass} value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="Upload an image or paste URL" /><input className="mt-2 block w-full text-xs text-slate-500" type="file" accept="image/*" onChange={onUpload} /></Field><Field label="Best for"><input className={inputClass} value={form.bestFor} onChange={(e) => update("bestFor", e.target.value)} /></Field></div><div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300"><label><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> <span className="ml-1">Featured</span></label><label><input type="checkbox" checked={form.trending} onChange={(e) => update("trending", e.target.checked)} /> <span className="ml-1">Trending</span></label><label>Status <select className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950" value={form.status} onChange={(e) => update("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></label></div><div className="mt-5 flex gap-2"><button disabled={busy} className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Saving…" : "Save tool"}</button><button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button></div></form>;
}

function BlogEditor({ form, setForm, busy, onSave, onCancel, onUpload }: { form: BlogFormState; setForm: React.Dispatch<React.SetStateAction<BlogFormState>>; busy: boolean; onSave: (event: FormEvent) => void; onCancel: () => void; onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
  const update = (key: keyof BlogFormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  return <form onSubmit={onSave} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="mb-4 flex items-center justify-between"><h3 className="font-black text-slate-900 dark:text-white">Blog editor</h3><button type="button" onClick={onCancel} className="text-xs font-bold text-slate-500">Close</button></div><div className="grid gap-4 md:grid-cols-2"><Field label="Title" wide><input required className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} /></Field><Field label="Slug"><input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} /></Field><Field label="Category"><input className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)} /></Field><Field label="Author"><input className={inputClass} value={form.author} onChange={(e) => update("author", e.target.value)} /></Field><Field label="Date"><input type="date" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} /></Field><Field label="Read time"><input className={inputClass} value={form.readTime} onChange={(e) => update("readTime", e.target.value)} /></Field><Field label="Excerpt" wide><textarea required className={textareaClass} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></Field><Field label="Content (Markdown-style text)" wide><textarea required className="min-h-[360px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" value={form.content} onChange={(e) => update("content", e.target.value)} /></Field><Field label="Tags (comma separated)"><input className={inputClass} value={form.tags} onChange={(e) => update("tags", e.target.value)} /></Field><Field label="Cover image"><input className={inputClass} value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="Upload an image or paste URL" /><input className="mt-2 block w-full text-xs text-slate-500" type="file" accept="image/*" onChange={onUpload} /></Field></div><div className="mt-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">Status <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950" value={form.status} onChange={(e) => update("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div><div className="mt-5 flex gap-2"><button disabled={busy} className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Saving…" : "Save blog post"}</button><button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Cancel</button></div></form>;
}
