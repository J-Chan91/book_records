/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/naver/api/:path*",
        destination: `https://openapi.naver.com/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
