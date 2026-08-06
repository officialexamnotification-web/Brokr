/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Vercel deployment optimization
  output: 'standalone',
};

module.exports = nextConfig;
