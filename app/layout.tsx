import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Gallery } from "./gallery";
import "./globals.css";

/* zimmr's faces: Geist for everything you read, Geist Mono for the tiny
   tracked labels and the numbers. */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/* Apex redirects to www, so www is canonical — pointing this at the apex would
   make every og:image and canonical URL a redirect hop. */
const SITE = "https://www.donaldchung.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Donald Chung · what's still open",
  description:
    "Donald Chung, computer engineering at UNSW. Ten builds, nine deployed. Lead growth engineer at Habeas. Open to full-stack and product engineering roles in Sydney.",
  authors: [{ name: "Donald Chung" }],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "Donald Chung",
    url: SITE,
    title: "Donald Chung · what's still open",
    description:
      "Full-stack & product engineering. Ten builds, nine deployed and running. Open to work in Sydney.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Donald Chung, what's still open. Eight builds, seven deployed and running.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donald Chung · what's still open",
    description:
      "Full-stack & product engineering. Ten builds, nine deployed and running. Open to work in Sydney.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Donald Chung",
  url: SITE,
  image: `${SITE}/og.png`,
  jobTitle: ["Lead Growth Engineer", "Head of GTM Strategy"],
  email: "mailto:donaldchung.work@gmail.com",
  worksFor: { "@type": "Organization", name: "Habeas" },
  affiliation: { "@type": "CollegeOrUniversity", name: "UNSW Sydney" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sydney",
    addressCountry: "AU",
  },
  knowsAbout: [
    "Full-stack engineering",
    "Product engineering",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "Growth",
    "SEO",
    "GEO content",
  ],
  sameAs: [
    "https://github.com/donaldchunggit",
    "https://linkedin.com/in/donald-chung-45229b350",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#fcfcfb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <Gallery />
        {children}
      </body>
    </html>
  );
}
