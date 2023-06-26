/** @type {import('next').NextConfig} */
import path from 'path';
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["react.semantic-ui.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
