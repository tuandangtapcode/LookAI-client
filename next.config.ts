import { rewriteRoutes } from '@/utils/constant/route'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  async rewrites() {
    return rewriteRoutes
  }
}

export default nextConfig
