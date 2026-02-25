"use client";

import { useSearchParams } from "next/navigation";
import PaymentSummary from "./PaymentSummary";

export default function Page() {
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");
  return <PaymentSummary orderId={orderIdFromUrl} />;
}
