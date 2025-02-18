import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'covers.openlibrary.org', 
      'books.google.com', 
      'lh3.googleusercontent.com'
    ]
  }
};

module.exports = nextConfig;

export default nextConfig;
