"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    // Only in development
    if (process.env.NODE_ENV !== "development") return;

    const interval = setInterval(() => {
      router.refresh(); // ✅ soft refresh
    }, 1500); // refresh every 1.5s

    return () => clearInterval(interval);
  }, [router]);

  return null;
}
