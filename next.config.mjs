/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          // Fallback pour les modules côté client
          config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
            encoding: false,  // Désactive le module 'encoding' pour le navigateur
          };
        }
    
        return config;
      },
};

export default nextConfig;