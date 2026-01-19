"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const STORAGE_KEY = "whyDrawerSeen";

// Subscribe function for useSyncExternalStore (no-op since we just want to track hydration)
const subscribe = () => () => {};

// Server snapshot
const getServerSnapshot = () => false;

// Client snapshot
const getClientSnapshot = () => true;

export function useWhyDrawer() {
  const isMounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize isOpen state based on URL param (only on client after hydration)
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    // Check URL on initial render
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("why") === "1";
  });

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    // Add ?why=1 to URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("why", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    // Mark as seen in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    // Remove ?why from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("why");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const toggleDrawer = useCallback(() => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }, [isOpen, openDrawer, closeDrawer]);

  return {
    isOpen,
    isMounted,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
