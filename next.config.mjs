// CHINH is built and hosted from its own repo on Vercel; serve it at /chinh-recovery here.
// Its build is served from the root, so its files live under /assets/ (this site has none of its own there).
const CHINH = "https://chinh-recovery.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // One address: the old vercel.app name sends visitors (and old links, hash included) to the custom domain
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "duychinhdinh.vercel.app" }], destination: "https://www.duychinhdinh.com/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/chinh-recovery", destination: `${CHINH}/` },
      { source: "/chinh-recovery/:path+", destination: `${CHINH}/:path+` },
      { source: "/assets/:path+", destination: `${CHINH}/assets/:path+` },
    ];
  },
};

export default nextConfig;
