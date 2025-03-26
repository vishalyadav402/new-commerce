/** @type {import('next').NextConfig} */

import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["api.therashtriya.com", "via.placeholder.com"],
    // Uncomment if needed
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "via.placeholder.com",
    //     port: "",
    //     pathname: "",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "api.therashtriya.com",
    //     port: "",
    //     pathname: "uploads",
    //   },
    // ],
  },
});

export default nextConfig;
