import type { Metadata } from "next";
import { Biryani } from "next/font/google";

import SiteChrome from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

// The design uses Light / Regular / SemiBold / Bold / Black of the same family.
const biryani = Biryani({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-biryani",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.owner} — Multimedia Design Portfolio`,
    template: `%s — ${SITE.owner}`,
  },
  description:
    "Portfolio of Chai Gai Foon, a multimedia design student working across photography, illustration, 3D and poster design.",
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
