/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbs.matrimonycdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
