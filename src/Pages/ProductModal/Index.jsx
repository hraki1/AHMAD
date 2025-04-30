import React, { useState } from "react";
import QuickShopModal from "./QuickShopModal";
import AddToCartModal from "./AddToCartModal";
import QuickViewModal from "./QuickViewModal"; // تأكد من إضافة هذا

export default function Index() {
  return (
    <div>
      <QuickShopModal />
      <AddToCartModal />
      <QuickViewModal />
    </div>
  );
}
