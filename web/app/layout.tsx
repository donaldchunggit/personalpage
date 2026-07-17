import type { Metadata } from "next";
import { Newsreader, Inter_Tight, Martian_Mono } from "next/font/google";
import { BASE_PATH, SITE } from "../base-path";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Donald Chung · what's still open",
  description:
    "Donald Chung, computer engineering at UNSW. Eight builds, seven deployed. Lead growth engineer at Habeas. Open to full-stack and product engineering roles in Sydney.",
  authors: [{ name: "Donald Chung" }],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "Donald Chung",
    url: SITE,
    title: "Donald Chung · what's still open",
    description:
      "Full-stack & product engineering. Eight builds, seven deployed and running. Open to work in Sydney.",
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
      "Full-stack & product engineering. Eight builds, seven deployed and running. Open to work in Sydney.",
    images: ["/og.png"],
  },
  /* Metadata icons emit the href verbatim — basePath is not applied here. */
  icons: { icon: `${BASE_PATH}/favicon.svg` },
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
      className={`${newsreader.variable} ${interTight.variable} ${martianMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#E9EAE6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
