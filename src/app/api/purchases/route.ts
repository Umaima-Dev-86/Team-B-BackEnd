import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { apiHandler, preflight } from "@/lib/api";
import { HttpError } from "@/lib/errors";

export const dynamic = "force-dynamic";
export const OPTIONS = preflight;

// GET /api/purchases - Fetch all purchases / stock restocking history
export const GET = apiHandler(async () => {
  const snapshot = await getAdminDb().collection("purchases").orderBy("createdAt", "desc").get();
  
  const purchases = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ success: true, data: purchases });
});

// POST /api/purchases - Record a new purchase and update stock
export const POST = apiHandler(async ({ req }) => {
  const body = await req.json();
  const { supplierName, items, totalCost } = body;

  if (!items || !Array.isArray(items) || items.length === 0 || totalCost == null) {
    throw new HttpError(400, "Items list and total cost are required");
  }

  const db = getAdminDb();
  const batch = db.batch();

  // 1. Create purchase record
  const purchaseRef = db.collection("purchases").doc();
  const newPurchase = {
    supplierName: supplierName || "General Supplier",
    items,
    totalCost: Number(totalCost),
    createdAt: new Date().toISOString(),
  };
  batch.set(purchaseRef, newPurchase);

  // 2. Automatically update stock for each purchased product if productId is provided
  for (const item of items) {
    if (item.productId && item.quantity) {
      const productRef = db.collection("products").doc(item.productId);
      const productDoc = await productRef.get();
      
      if (productDoc.exists) {
        const currentStock = productDoc.data()?.stock || 0;
        batch.update(productRef, {
          stock: currentStock + Number(item.quantity),
          updatedAt: new Date().toISOString(),
        });
      }
    }
  }

  await batch.commit();

  return NextResponse.json(
    { success: true, data: { id: purchaseRef.id, ...newPurchase } },
    { status: 201 }
  );
});