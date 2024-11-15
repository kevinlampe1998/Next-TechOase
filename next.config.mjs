/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbopack: false,
    },
    productionBrowserSourceMaps: false,
};

export default nextConfig;
