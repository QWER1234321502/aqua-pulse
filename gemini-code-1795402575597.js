// =========================================================================
// [AQUA WAVE] Supabase 연결 모듈 (db.js)
// - Project URL: https://yzuwisnkdhjsqfmkpnnb.supabase.co
// - Publishable Key: sb_publishable_FdV8yIRZ1JTL_mfzqULcKA_qazQbGie
// - 연결 변수명: db
// =========================================================================
const SUPABASE_URL = "https://yzuwisnkdhjsqfmkpnnb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_FdV8yIRZ1JTL_mfzqULcKA_qazQbGie";

const SHOP_TABLES = {
  profiles: "shop_profiles",
  products: "shop_products",
  orders: "shop_orders",
  orderItems: "shop_order_items"
};

let db = null;

if (window.supabase && typeof window.supabase.createClient === "function") {
  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

async function checkShopProductsConnection() {
  if (!db) {
    console.error("연결 실패: supabase-js 클라이언트가 초기화되지 않았습니다.");
    return;
  }

  const { data, count, error } = await db
    .from("shop_products")
    .select("id", { count: "exact" });

  if (error) {
    console.error(error.message || error);
    return;
  }

  const totalCount = typeof count === "number" ? count : (Array.isArray(data) ? data.length : 0);
  console.log(`연결 성공: 상품 ${totalCount}개`);
}

document.addEventListener("DOMContentLoaded", () => {
  checkShopProductsConnection();
});