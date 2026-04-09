import fs from "fs";
import path from "path";
import type { Product, Blog, Contact } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureFile(filename: string, defaultContent: string = "[]") {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, defaultContent);
  return filepath;
}

export function getProducts(): Product[] {
  const filepath = ensureFile("products.json");
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function saveProducts(products: Product[]) {
  const filepath = ensureFile("products.json");
  fs.writeFileSync(filepath, JSON.stringify(products, null, 2));
}

export function getBlogs(): Blog[] {
  const filepath = ensureFile("blogs.json");
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function saveBlogs(blogs: Blog[]) {
  const filepath = ensureFile("blogs.json");
  fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

export function getContacts(): Contact[] {
  const filepath = ensureFile("contacts.json");
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function saveContacts(contacts: Contact[]) {
  const filepath = ensureFile("contacts.json");
  fs.writeFileSync(filepath, JSON.stringify(contacts, null, 2));
}
