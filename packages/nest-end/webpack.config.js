/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require('fs');
const distFileName = 'main.js';
const dist = path.resolve(__dirname, 'dist');
const distFile = path.resolve(dist, distFileName);

module.exports = {
  entry: path.join(__dirname, './src/main.ts'),
  target: 'node',
  // 置为空即可忽略webpack-node-externals插件
  externals: ['svg-captch'], // 忽略 svg-captch 的打包
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    //   {
    //     test: /svg-captcha/,
    //     use: path.resolve(__dirname, './loader/svgcaptcha.js'),
    //   },
    //   {
    //     test: /xlsx-style/,
    //     use: path.resolve(__dirname, './loader/xlsx.js'),
    //   },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  // 打包后的文件名称以及位置
  output: {
    filename: distFileName,
    path: dist,
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          'class-transformer/storage',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
    //打包完成后把host替换成内网ip
   
  ],
};
