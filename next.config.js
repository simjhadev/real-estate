/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bayut-production.s3.eu-central-1.amazonaws.com',
        
        
      },
      {
        protocol: 'https',
        hostname: 'ap.rdcpix.com',
      },
      {
        protocol: 'https',
        hostname: 'nh.rdcpix.com',
      },
      {
        protocol: 'https',
        hostname: 'ar.rdcpix.com',
      },
    ],
  },
}

module.exports = nextConfig
