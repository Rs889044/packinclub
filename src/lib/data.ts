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
  enableWhatsApp: false,
  whoWeAreImage: "",
  productLifeCycleImage: "",
  whyChooseUsCards: [
    { title: "100% Plant-Based", desc: "Every product is made from renewable, plant-derived materials that fully decompose." },
    { title: "Strength of Plastic", desc: "Our compostable products match the durability and performance of conventional plastic." },
    { title: "CPCB-Certified", desc: "All manufacturing partners are CPCB-certified, meeting India's highest standards." },
    { title: "Fully Customizable", desc: "Custom printing, sizing, and branding options for your unique business needs." },
    { title: "Widest Range in India", desc: "24+ compostable product types across retail, industrial, and agriculture." },
    { title: "Dedicated Support", desc: "Personal account management and responsive customer support for every client." }
  ],
  socialLinks: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  }
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
