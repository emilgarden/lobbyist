/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for faster builds
  swcMinify: true,
  // Enable static optimization where possible
  output: 'standalone',
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

