import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { apiHandler, preflight } from "@/lib/api";
import { HttpError } from "@/lib/errors";

export const dynamic = "force-dynamic";
export const OPTIONS = preflight;

// GET /api/sales - Sales history / ledger fetch karne ke liye
export const GET = apiHandler(async () => {
  const snapshot = await getAdminDb().collection("sales").orderBy("createdAt", "desc").get();
  
  const sales = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ success: true, data: sales });
});

// POST /api/sales - Naya sale transaction / invoice record karne ke liye
export const POST = apiHandler(async ({ req }) => {
  const body = await req.json();
  const { customerName, items, totalAmount, paymentStatus } = body;

  if (!items || !Array.isArray(items) || items.length === 0 || totalAmount == null) {
    throw new HttpError(400, "Items list and total amount are required");
  }

  const newSale = {
    customerName: customerName || "Walk-in Customer",
    items,
    totalAmount: Number(totalAmount),
    paymentStatus: paymentStatus || "paid", // 'paid' or 'pending'
    createdAt: new Date().toISOString(),
  };

  const docRef = await getAdminDb().collection("sales").add(newSale);

  return NextResponse.json(
    { success: true, data: { id: docRef.id, ...newSale } },
    { status: 201 }
  );
});