// CHINH is built and hosted from its own repo on GitHub Pages; serve it at /chinh-recovery here.
const CHINH = "https://tonyfromvietnam.github.io/chinh-recovery";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/chinh-recovery", destination: `${CHINH}/` },
      { source: "/chinh-recovery/:path+", destination: `${CHINH}/:path+` },
    ];
  },
};

export default nextConfig;
