import type { Metadata } from "next";
import "../styles/globals.css";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import Loading from "@/components/loading";

export const metadata: Metadata = {
  title: "Art for Memories",
  description: "Art for Memories is a platform that allows you to share your memories in a creative way.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Art For Memories" />
      </head>
      <body className="antialiased bg-neutral-900">
        <Suspense fallback={<Loading />}>
          <main>
            <TopLoader />
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}
