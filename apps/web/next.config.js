/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["static.nike.com","img.freepik.com","res.cloudinary.com"],
  },
    transpilePackages:[
        "@workspace/ui",
    ],
    
};

export default nextConfig;
