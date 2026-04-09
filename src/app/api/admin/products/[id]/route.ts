import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const body = await request.json();
    const products = getProducts();
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[index] = {
      ...products[index],
      name: body.name ?? products[index].name,
      slug: body.slug ?? products[index].slug,
      category: body.category ?? products[index].category,
      description: body.description ?? products[index].description,
      longDescription: body.longDescription ?? products[index].longDescription ?? "",
      image: body.image ?? products[index].image,
      featured: body.featured ?? products[index].featured,
      keyFeatures: body.keyFeatures ?? products[index].keyFeatures ?? [],
      applications: body.applications ?? products[index].applications ?? [],
      faqs: body.faqs ?? products[index].faqs ?? [],
    };

    saveProducts(products);
    return NextResponse.json(products[index]);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const products = getProducts();
    const filtered = products.filter(p => p.id !== productId);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    saveProducts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
