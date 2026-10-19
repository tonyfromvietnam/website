// CHINH is built and hosted from its own repo on Vercel; serve it at /chinh-recovery here.
// Its build is served from the root, so its files live under /assets/ (this site has none of its own there).
const CHINH = "https://chinh-recovery.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/chinh-recovery", destination: `${CHINH}/` },
      { source: "/chinh-recovery/:path+", destination: `${CHINH}/:path+` },
      { source: "/assets/:path+", destination: `${CHINH}/assets/:path+` },
    ];
  },
};

export default nextConfig;
