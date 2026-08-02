const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

module.exports = {
  resolve: {
    alias: {
      '@housi-nx-microservices/proto-contracts': resolve(
        __dirname,
        '../../libs/proto-contracts/src/index.ts',
      ),
      '@housi-nx-microservices/exceptions': resolve(
        __dirname,
        '../../libs/exceptions/src/index.ts',
      ),
      '@housi-nx-microservices/event-schemas': resolve(
        __dirname,
        '../../libs/event-schemas/src/index.ts',
      ),
    },
  },
  output: {
    path: join(__dirname, '../../dist/apps/notification-service'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
