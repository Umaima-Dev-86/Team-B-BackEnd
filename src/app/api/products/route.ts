import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { apiHandler, preflight } from "@/lib/api";
import { HttpError } from "@/lib/errors";

export const dynamic = "force-dynamic";
export const OPTIONS = preflight;

// GET /api/products - Fetch all products
export const GET = apiHandler(async () => {
  const snapshot = await getAdminDb().collection("products").get();
  
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ success: true, data: products });
});

// POST /api/products - Create a new product
export const POST = apiHandler(async ({ req }) => {
  const body = await req.json();
  const { name, price, category, stock, unit } = body;

  if (!name || price == null) {
    throw new HttpError(400, "Product name and price are required");
  }

  const newProduct = {
    name,
    price: Number(price),
    category: category || "General",
    stock: Number(stock) || 0,
    unit: unit || "pcs",
    createdAt: new Date().toISOString(),
  };

  const docRef = await getAdminDb().collection("products").add(newProduct);

  return NextResponse.json(
    { success: true, data: { id: docRef.id, ...newProduct } },
    { status: 201 }
  );
});

