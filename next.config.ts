import { rewriteRoutes } from '@/utils/constant/route'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  async rewrites() {
    return rewriteRoutes
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  }
}

export default nextConfig
