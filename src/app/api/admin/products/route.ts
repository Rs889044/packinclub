import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, category, description, image, featured, longDescription, keyFeatures, applications, faqs } = body;

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
    }

    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      category,
      description: description || "",
      longDescription: longDescription || "",
      image: image || "",
      featured: featured || false,
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      applications: Array.isArray(applications) ? applications : [],
      faqs: Array.isArray(faqs) ? faqs : [],
    };

    products.push(newProduct);
    saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
