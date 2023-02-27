/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['ipfs.io', 'nft-cdn.alchemy.com', 'res.cloudinary.com', 'arweave.net'],
  },
}

module.exports = nextConfig
