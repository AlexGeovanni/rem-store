import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/footer";
import "@workspace/ui/globals.css";
import QueryProvider from "./components/providers/queryProvider";
import { Header } from "./components/header";
import { AuthProvider } from "./providers/authProvider";
import { getAuthToken } from "./actions/auth.actions";
import { decodeJWT, getEmailFromPayload, getNameFromPayload } from "@repo/api-client/jwt";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://remstore.com"),

  title: {
    default: "Rem/Store | Marketplace Online",
    template: "%s | Rem/Store",
  },

  description:
    "Rem/Store es un marketplace online donde puedes comprar ropa, electrónicos, hogar y más de forma rápida, segura y confiable.",

  keywords: [
    "marketplace",
    "tienda online",
    "ecommerce",
    "ropa",
    "electrónicos",
    "hogar",
    "compras online",
    "moda",
    "productos",
    "Rem Store",
  ],

  authors: [
    {
      name: "Rem/Store",
      url: "https://remstore.com",
    },
  ],

  creator: "Rem/Store",
  publisher: "Rem/Store",

  applicationName: "Rem/Store",
  category: "ecommerce",

  alternates: {
    canonical: "https://remstore.com",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Rem/Store | Marketplace Online",
    description:
      "Compra ropa, electrónicos, hogar y más en Rem/Store. Marketplace moderno, rápido y seguro.",
    url: "https://remstore.com",
    siteName: "Rem/Store",
    locale: "es_MX",
    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Rem/Store Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rem/Store | Marketplace Online",
    description:
      "Compra productos online de forma segura en Rem/Store.",
    images: ["/twitter-image.png"],
    creator: "@remstore",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "google-site-verification-code",
  },

  // manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token = await getAuthToken();
  const name = getNameFromPayload(decodeJWT(token ?? ""));
  const email = getEmailFromPayload(decodeJWT(token ?? ""));
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <AuthProvider user={name && email ? { name, email } : null}>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
