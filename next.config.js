/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Enable dynamic rendering where needed
  async redirects() {
    return [
      {
        source: "/reset-password",
        destination: "/reset-password", // Keep the route as it is, but ensure dynamic render
        permanent: true,
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
