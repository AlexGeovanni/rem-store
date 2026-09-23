/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
    {
      protocol: "https",
      hostname: "static.nike.com",
    },
    {
      protocol: "https",
      hostname: "img.freepik.com",
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
},
    transpilePackages:[
        "@workspace/ui",
    ],
    
};

export default nextConfig;
