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
        child_process: false, // Ignorer child_process
      };
    }

    // Gérer les fichiers .node
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/videos',
          publicPath: '/_next/static/videos',
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};


export default nextConfig;