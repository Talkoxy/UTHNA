// next.config.js or next.config.ts

import type { NextConfig } from "next";
import autoCert from "anchor-pki/auto-cert/integrations/next";


const withAutoCert = autoCert({
  enabledEnv: "development",
});

// 1. Define the core Next.js configuration object with all properties
const nextConfig: NextConfig = {
  // CONFIGURATION FOR NEXT/IMAGE
  images: {
    // 1. KEEP YOUR remotePatterns (it's correct)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '167.172.62.178',
        port: '',
        pathname: '/**'
      },
    ],
    
    // 2. ADD domains AS A BACKUP
    domains: [
        '167.172.62.178', 
        // Note: You only list hostnames here, no protocol
    ], 
  },

  // CONFIGURATION FOR TURBOPACK WARNING
  // Fixes the "Detected multiple lockfiles" warning
  // Note: 'turbopack' is now a top-level key in newer Next.js versions
  turbopack: {
    root: './',
  },
  
  // CONFIGURATION FOR LOCAL DEVELOPMENT ORIGINS (to work with anchor-pki domains)
  // These domains are what the anchor-pki proxy is using to serve your site over HTTPS
  allowedDevOrigins: [
    'https://uthna.lcl.host',
    'https://uthna.localhost',
    '192.168.1.98',
    'localhost',
    'uthna.lcl.host', // Anchor-pki might be serving on a non-standard port, but the hostname is what matters
    'uthna.localhost',
    // Add any other specific domains you need, like the ones you originally intended:
    'local-origin.dev',
    '*.local-origin.dev',
  ],

  // ... other settings (reactStrictMode, experimental, etc.)
};

// 2. Export the final configuration after applying the wrapper
export default withAutoCert(nextConfig);