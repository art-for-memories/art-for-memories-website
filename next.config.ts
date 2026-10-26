import type { NextConfig } from "next";

const remoteImageHosts = [
  "lh3.googleusercontent.com",
  "res.cloudinary.com",
  "cdn.rareblocks.xyz",
  "www.newtimes.co.rw",
  "encrypted-tbn0.gstatic.com",
  "dynamic-media-cdn.tripadvisor.com",
  "www.passage.law",
  "upload.wikimedia.org",
  "pbs.twimg.com",
  "images.unsplash.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remoteImageHosts.map((hostname) => ({ protocol: "https", hostname })),
  },
};

export default nextConfig;
