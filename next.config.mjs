/** @type {import('next').NextConfig} */
const nextConfig = {
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
