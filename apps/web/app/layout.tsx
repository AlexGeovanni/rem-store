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
  title: "Rem/Store",
  description: "Tienda de ropa online",
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
