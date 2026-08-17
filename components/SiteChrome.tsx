"use client";

import { usePathname } from "next/navigation";

import Footer from "./Footer";
import Header from "./Header";

/**
 * The four main pages sit inside the site header and footer. The artwork
 * detail view does not — frame `Artwork inside show 1440` (373:210) is drawn
 * as a full-screen overlay with its own close control and no site chrome, so
 * it opts out here rather than through a separate route tree.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = /^\/artwork\/.+/.test(pathname);

  if (bare) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
