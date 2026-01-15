/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.gettyimages.com",
      },
      // Add more hosts here later (e.g., for your own uploaded images)
    ],
  },
};

export default nextConfig;