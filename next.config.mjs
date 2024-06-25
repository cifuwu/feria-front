/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true,
        loader: 'default',
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '*',
          },
          {
            protocol: 'https',
            hostname: '*',
          },
        ],
      }
};

export default nextConfig;
