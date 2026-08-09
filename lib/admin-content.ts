import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseFirestore, getFirebaseStorage } from "@/lib/firebase";
import type { BlogPost, Tool } from "@/lib/data";

export type PublishStatus = "draft" | "published";

export type ManagedTool = Partial<Tool> & {
  docId: string;
  status: PublishStatus;
  imageUrl?: string;
  source: "managed";
  updatedAt?: string;
};

export type ManagedBlogPost = Partial<BlogPost> & {
  docId: string;
  status: PublishStatus;
  imageUrl?: string;
  source: "managed";
  updatedAt?: string;
};

export type ToolSubmission = {
  docId: string;
  name: string;
  website: string;
  category: string;
  description: string;
  features: string;
  pricing: string;
  email: string;
  status: string;
  createdAt?: string;
};

function requireDb() {
  const db = getFirebaseFirestore();
  if (!db) throw new Error("Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values first.");
  return db;
}

function requireStorage() {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage is not configured.");
  return storage;
}

function timestampToString(value: unknown) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  return undefined;
}

function fromDoc<T extends Record<string, unknown>>(id: string, data: DocumentData): T & { docId: string } {
  return {
    docId: id,
    ...data,
    createdAt: timestampToString(data.createdAt),
    updatedAt: timestampToString(data.updatedAt),
  } as unknown as T & { docId: string };
}

export function splitList(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value;
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function listManagedTools() {
  const snapshot = await getDocs(collection(requireDb(), "managedTools"));
  return snapshot.docs
    .map((item) => fromDoc<ManagedTool>(item.id, item.data()))
    .sort((a, b) => String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? "")));
}

export async function listManagedBlogs() {
  const snapshot = await getDocs(collection(requireDb(), "managedBlogs"));
  return snapshot.docs
    .map((item) => fromDoc<ManagedBlogPost>(item.id, item.data()))
    .sort((a, b) => String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? "")));
}

export async function listToolSubmissions() {
  const snapshot = await getDocs(collection(requireDb(), "toolSubmissions"));
  return snapshot.docs
    .map((item) => fromDoc<ToolSubmission>(item.id, item.data()))
    .sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")));
}

export async function saveManagedTool(docId: string | null, input: Record<string, unknown>) {
  const db = requireDb();
  const payload = {
    ...input,
    source: "managed",
    updatedAt: serverTimestamp(),
  };
  if (docId) {
    await updateDoc(doc(db, "managedTools", docId), payload);
    return docId;
  }
  const created = await addDoc(collection(db, "managedTools"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return created.id;
}

export async function saveManagedBlog(docId: string | null, input: Record<string, unknown>) {
  const db = requireDb();
  const payload = {
    ...input,
    source: "managed",
    updatedAt: serverTimestamp(),
  };
  if (docId) {
    await updateDoc(doc(db, "managedBlogs", docId), payload);
    return docId;
  }
  const created = await addDoc(collection(db, "managedBlogs"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return created.id;
}

export async function removeManagedContent(collectionName: "managedTools" | "managedBlogs", docId: string) {
  await deleteDoc(doc(requireDb(), collectionName, docId));
}

export async function updateToolSubmission(docId: string, status: string) {
  await updateDoc(doc(requireDb(), "toolSubmissions", docId), {
    status,
    reviewedAt: serverTimestamp(),
  });
}

export async function uploadManagedImage(file: File, kind: "tools" | "blogs") {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-90);
  const path = `managed-content/${kind}/${Date.now()}-${safeName || "image"}`;
  const imageRef = ref(requireStorage(), path);
  try {
    await Promise.race([
      uploadBytes(imageRef, file, { contentType: file.type }),
      new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("Storage upload timed out.")), 6000)),
    ]);
    return getDownloadURL(imageRef);
  } catch {
    return optimizeImageForFirestore(file);
  }
}

async function optimizeImageForFirestore(file: File) {
  if (typeof window === "undefined") throw new Error("Image upload is only available in the browser.");
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Could not read the selected image."));
      element.src = objectUrl;
    });
    const maxDimension = 1200;
    const scale = Math.min(1, maxDimension / image.naturalWidth, maxDimension / image.naturalHeight);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.82, 0.7, 0.58]) {
      const dataUrl = canvas.toDataURL("image/webp", quality);
      if (dataUrl.length < 800_000) return dataUrl;
    }
    throw new Error("Image is too large after optimization. Choose a smaller image.");
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function toolFromSubmission(submission: ToolSubmission) {
  const categoryNames: Record<string, { id: number; name: string }> = {
    "forex-brokers": { id: 1, name: "Forex Brokers" },
    "crypto-exchanges": { id: 2, name: "Crypto Exchanges" },
    "stock-brokers": { id: 3, name: "Stock Brokers" },
    "cfd-brokers": { id: 4, name: "CFD Brokers" },
    "options-trading": { id: 5, name: "Options Trading" },
    "payment-systems": { id: 6, name: "Payment Systems" },
    "trading-tools": { id: 7, name: "Trading Tools" },
    education: { id: 8, name: "Education" },
  };
  const category = categoryNames[submission.category] ?? { id: 7, name: "Trading Tools" };
  const slug = submission.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: Date.now(),
    name: submission.name,
    slug,
    logo: submission.name.slice(0, 2).toUpperCase(),
    rating: null,
    description: submission.description,
    longDescription: submission.description,
    category: category.name,
    categoryId: category.id,
    features: splitList(submission.features),
    pros: [],
    cons: [],
    pricing: submission.pricing || "Provider-defined",
    pricingDetail: submission.pricing || "Confirm current pricing with the provider.",
    minDeposit: "Not stated",
    platforms: ["Web"],
    website: submission.website,
    affiliate: false,
    trending: false,
    featured: false,
    yearFounded: new Date().getFullYear(),
    regulation: [],
    supportedCountries: ["Global"],
    depositMethods: [],
    withdrawalTime: "Provider-dependent",
    customerSupport: "Provider-dependent",
    mobileApp: false,
    demoAccount: false,
    faq: [],
    bestFor: [],
    sourceUrls: [submission.website],
    dataStatus: "unverified",
    status: "draft" as PublishStatus,
  };
}
