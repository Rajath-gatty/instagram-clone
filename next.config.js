/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:["lh3.googleusercontent.com","instagram-clone01.s3.ap-south-1.amazonaws.com"]
  }
}

module.exports = nextConfig
