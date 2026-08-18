import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Nothing here is private, so everything is crawlable. The file earns its
 * place by naming the sitemap: that is how a crawler arriving at the root
 * finds the 48 detail pages without walking the listing canvas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).href,
  };
}
