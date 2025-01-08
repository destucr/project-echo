/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: `https://elosalmonl.xyz/:path*`, 
        },
      ];
    },
  };
  
export default nextConfig;