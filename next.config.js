/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // experimental: {
  //   serverActions: true,
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
      },
    ],
  },
}

module.exports = nextConfig
