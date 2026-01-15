"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Listen for route changes
    window.addEventListener("beforeunload", handleStart);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border-2 border-gray-200 dark:border-gray-700">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Loading...
        </p>
      </div>
    </div>
  );
}
