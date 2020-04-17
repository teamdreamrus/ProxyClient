const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const ZipPlugin = require('zip-webpack-plugin');
const manifest = require('./static/manifest.json');

let archiveFileName = process.env.ARTIFACT_NAME;

if (!archiveFileName) {
  archiveFileName = `timeTracker-ext-${manifest.version}.zip`;
}

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'app'),
  material: path.join(__dirname, 'node_modules'),
};

const prodPlugins = [];
let minimizer = [];
if (process.env.NODE_ENV === 'production') {
  minimizer = [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          drop_console: false,
        },
      },
    }),
  ];

  prodPlugins.push(
    new ZipPlugin({
      path: '../artifact',
      filename: archiveFileName,
    }),
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  watch: process.env.NODE_ENV === 'development',
  devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
    ].concat(minimizer),
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      name: false,
    },
  },
  stats: {
    children: false,
  },
  entry: {
    bg: `${PATHS.source}/bg/app.js`,
    popup: `${PATHS.source}/popup/app.js`,
  },
  output: {
    path: PATHS.build,
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader', {
          loader: 'vuetify-loader',
          options: {
            theme: path.resolve('./node_modules/vuetify/src/stylus/theme.styl'),
          },
        }],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            js: {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] },
            },
          },
        },
      },
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['lodash', '@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.less$/,
        exclude: [
          /serp\.less/,
          `${PATHS.source}/style.less`,
        ],
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.less$/,
        include: [
          /serp\.less/,
          `${PATHS.source}/style.less`,
        ],
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:6]',
            },
          }, 'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader', {
            loader: 'sass-loader',
            options: {
              includePaths: [`${PATHS.material}`],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|svg|otf|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 500000,
        },
      },
    ],
  },
  plugins: [
    new VuetifyLoaderPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['app']),
    new CopyWebpackPlugin([{
      from: 'static',
    }]),
    new MiniCssExtractPlugin({
      filename: '[name]/styles.css',
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true,
    }),
    ...prodPlugins,
  ],
};
