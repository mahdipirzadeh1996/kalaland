/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nextui-org/react'], // Transpile Chakra UI for compatibility with Next.js
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home', // Redirect to the new default page
        permanent: true, // 301 Redirect (permanent)
      },
    ]
  },
}

export default nextConfig
