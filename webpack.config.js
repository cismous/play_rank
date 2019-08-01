/* eslint-disable @typescript-eslint/no-var-requires */
const TerserJSPlugin = require('terser-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { NODE_ENV } = process.env
const devMode = NODE_ENV === 'development'
const publicPath = '/'

module.exports = {
  mode: devMode ? 'development' : 'production',

  devtool: devMode ? 'source-map' : '',

  stats: {
    children: false,
  },

  entry: {
    main: './src/main.tsx',
  },

  output: {
    filename: 'bundle.[hash].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  plugins: [
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: !devMode,
    //   analyzerMode: 'static',
    //   reportFilename: 'analyzer.html',
    // }),
    new HtmlPlugin({
      template: './public/index.html',
      BASE_URL: publicPath,
    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[chunkhash].css',
      orderWarning: true, // Disable to remove warnings about conflicting order between imports
    }),
  ],

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8200,
    hot: true,
    open: false,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'awesome-typescript-loader',
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'source-map-loader',
      },

      {
        test: /\.css$/,
        include: [__dirname + '/node_modules'],
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              publicPath: '../',
            },
          },

          { loader: 'css-loader' },
        ],
      },

      {
        test: /\.css$/,
        exclude: [__dirname + '/node_modules'],
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              publicPath: '../',
              hmr: devMode,
              reloadAll: true,
            },
          },

          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:5]',
                context: __dirname + '/src',
              },
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
}
