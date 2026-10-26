import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import Blogs from "@/components/sections/blogs";
import TwoColumnCarousel from "@/components/TwoColumnCarousel";

export const metadata: Metadata = {
  title: "Art for Memories Rwanda",
  description:
    "Art for Memories Rwanda is an initiative led by King Ngabo, launched in 2023 to preserve the legacy of Genocide Survivors by restoring old photos into vivid portraits. We transform memories into meaningful art to honor those lost in the 1994 Genocide against the Tutsi.",
  keywords: [
    "Art for Memories Rwanda",
    "Genocide memorial",
    "King Ngabo",
    "Ingabo Corner",
    "Genocide Survivors",
    "African stories",
    "memory preservation",
    "art for memories",
    "creative platform Rwanda",
    "1994 Genocide against Tutsi",
    "digital portraits",
    "photo restoration",
    "genocide",
    "Rwanda",
    "art",
    "survivors",
  ],
  robots: "index, follow",
  metadataBase: new URL("https://artformemories.com"),
  openGraph: {
    title: "Art for Memories Rwanda",
    description:
      "A creative initiative turning damaged memories into portraits to honor victims of the 1994 Genocide against the Tutsi. Led by King Ngabo and fellow Rwandan artists.",
    url: "https://artformemories.com",
    type: "website",
    images: [
      {
        url: "/images/thumbs.png",
        width: 1200,
        height: 630,
        alt: "Art for Memories Rwanda banner image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@artofmemoriesrw",
    title: "Art for Memories Rwanda",
    description:
      "Honoring the 1994 Genocide victims through art. Discover powerful stories, restored photos, and portraits from Rwandan artists.",
    images: ["/images/thumbs.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function Home() {
  return (
    <Layout>
      <div className="overflow-x-hidden bg-neutral-50">
        <Hero />
        <TwoColumnCarousel />
        <Blogs />
        <Partners />
      </div>
    </Layout>
  );
}
