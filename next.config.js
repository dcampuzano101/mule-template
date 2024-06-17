/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'swag.mulesoft.com'],
  },
  async rewrites() {
    return [
      {
        source: '/inventory/:path*',
        destination: 'http://127.0.0.1:8081/inventory',
      },
    ];
  },
};

module.exports = nextConfig;
