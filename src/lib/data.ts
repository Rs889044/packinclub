import fs from "fs";
import path from "path";
import type { Product, Blog, Contact, SiteSettings } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const productsFile = path.join(dataDir, "products.json");
const blogsFile = path.join(dataDir, "blogs.json");
const contactsFile = path.join(dataDir, "contacts.json");
const settingsFile = path.join(dataDir, "settings.json");

const defaultSettings: SiteSettings = {
  favicon: "",
  whoWeAreImage: "",
  productLifeCycleImage: "",
  whyChooseUsImages: ["", "", "", "", "", ""]
};

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

export function getProducts(): Product[] {
  if (!fs.existsSync(productsFile)) return [];
  return JSON.parse(fs.readFileSync(productsFile, "utf-8"));
}

export function saveProducts(products: Product[]) {
  ensureDir();
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

export function getBlogs(): Blog[] {
  if (!fs.existsSync(blogsFile)) return [];
  return JSON.parse(fs.readFileSync(blogsFile, "utf-8"));
}

export function saveBlogs(blogs: Blog[]) {
  ensureDir();
  fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
}

export function getContacts(): Contact[] {
  if (!fs.existsSync(contactsFile)) return [];
  const raw = fs.readFileSync(contactsFile, "utf-8");
  return JSON.parse(raw);
}

export function saveContacts(contacts: Contact[]) {
  ensureDir();
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
}

export function getSettings(): SiteSettings {
  if (!fs.existsSync(settingsFile)) return defaultSettings;
  try {
    const raw = fs.readFileSync(settingsFile, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings) {
  ensureDir();
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}
