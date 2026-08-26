/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "items-images-production.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "square-production.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "square-cdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
