"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

import { sectionHref } from "@/config/site";

/**
 * Resolves a shared navigation anchor for the route it is rendered on.
 *
 * The header, the mobile menu and the footer all render `NAV_ITEMS`, and all
 * three appear on both the homepage and every service page. On `/` the bare
 * fragment is returned untouched, so the homepage keeps exactly the native
 * behaviour §10g describes; anywhere else it becomes `/#section`.
 *
 * Deliberately a hook over one shared helper rather than a second navigation
 * config or a prop threaded through three components.
 */
export function useSectionHref(): (hash: string) => string {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return useCallback((hash: string) => sectionHref(hash, onHome), [onHome]);
}
