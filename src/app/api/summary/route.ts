import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { apiHandler, preflight } from "@/lib/api";

export const dynamic = "force-dynamic";
export const OPTIONS = preflight;

// GET /api/summary - Overall financial and inventory summary report
export const GET = apiHandler(async () => {
  const db = getAdminDb();

  // Fetch collections concurrently
  const [productsSnap, salesSnap, purchasesSnap] = await Promise.all([
    db.collection("products").get(),
    db.collection("sales").get(),
    db.collection("purchases").get(),
  ]);

  // 1. Calculate Products / Inventory Stats
  let totalProducts = productsSnap.size;
  let totalStockValue = 0;
  productsSnap.docs.forEach((doc) => {
    const data = doc.data();
    const price = Number(data.price) || 0;
    const stock = Number(data.stock) || 0;
    totalStockValue += price * stock;
  });

  // 2. Calculate Sales Stats
  let totalSalesRevenue = 0;
  let totalSalesCount = salesSnap.size;
  salesSnap.docs.forEach((doc) => {
    const data = doc.data();
    totalSalesRevenue += Number(data.totalAmount) || 0;
  });

  // 3. Calculate Purchases / Expenses Stats
  let totalPurchasesCost = 0;
  let totalPurchasesCount = purchasesSnap.size;
  purchasesSnap.docs.forEach((doc) => {
    const data = doc.data();
    totalPurchasesCost += Number(data.totalCost) || 0;
  });

  // 4. Net Profit/Loss estimation
  const netProfit = totalSalesRevenue - totalPurchasesCost;

  return NextResponse.json({
    success: true,
    data: {
      totalProducts,
      totalStockValue,
      totalSalesCount,
      totalSalesRevenue,
      totalPurchasesCount,
      totalPurchasesCost,
      netProfit,
    },
  });
});