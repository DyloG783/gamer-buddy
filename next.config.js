/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // experimental: {
  //   serverActions: true,
  // },

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },

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
