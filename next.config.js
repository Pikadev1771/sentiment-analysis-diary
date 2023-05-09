/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sentiment-diary.store/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/addnew',
        has: [
          {
            type: 'query',
            key: 'title',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
