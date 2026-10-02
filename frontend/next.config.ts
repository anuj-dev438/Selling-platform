
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tse1.mm.bing.net",
            },
            {
                protocol: "https",
                hostname: "thumbs.dreamstime.com",
            },
        ],
    },
};

export default nextConfig;
