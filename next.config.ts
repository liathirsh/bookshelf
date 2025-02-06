import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['covers.openlibrary.org', 'books.google.com']
  }
};

module.exports = nextConfig;

export default nextConfig;
