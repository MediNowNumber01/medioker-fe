import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Domain standar untuk gambar profil Google
        port: '',
        pathname: '/a/**',
      },
    ],
  },
};

export default nextConfig;
