/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['api.therashtriya.com','via.placeholder.com'],
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'via.placeholder.com',
        //     port: '',
        //     pathname: '',
        //   },
        //   {
        //     protocol: 'https',
        //     hostname: 'api.therashtriya.com',
        //     port: '',
        //     pathname: 'uploads',
        //   },
        // ],
      },
};

export default nextConfig;
