import type { Metadata } from "next";
import { Biryani } from "next/font/google";

import SiteChrome from "@/components/SiteChrome";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// The design uses Light / Regular / SemiBold / Bold / Black of the same family.
const biryani = Biryani({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-biryani",
  display: "swap",
});

export const metadata: Metadata = {
  /* Turns the relative URLs below — and `opengraph-image.jpg` next to this
     file — into the absolute ones Open Graph requires. */
  metadataBase: SITE_URL,
  title: {
    default: `${SITE.owner} — Multimedia Design Portfolio`,
    template: `%s — ${SITE.owner}`,
  },
  description:
    "Portfolio of Chai Gai Foon, a multimedia design student working across photography, illustration, 3D and poster design.",
  /* Without these a link to this site pastes into a chat or a feed as bare
     text. Neither block repeats the title or the description: Next fills
     `openGraph` from the page's own metadata when they are left out, and
     `twitter` from `openGraph` in turn — so each of the 52 pages keeps the
     heading and write-up it already declares, and the four fields here are
     only the ones that have no page-level equivalent. */
  openGraph: {
    type: "website",
    siteName: SITE.owner,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  /* Proves to Search Console that whoever asks for the crawl data owns the
     site. It is a public token by design — it only means anything paired with
     the Google account that issued it — and it is tied to the exact origin it
     was issued for, so renaming the Vercel project needs a new property and a
     new token here. */
  verification: { google: "naVT_CBHLCQIwy5dzORiAVcQCJNmt8Hd2TuQSGmp_2Y" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={biryani.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
