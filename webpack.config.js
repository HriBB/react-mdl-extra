var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;
var suffix = env === 'production' ? '.min' : '';
var filename = `react-mdl-extra${suffix}`;
var minify = process.env.MINIFY;

var config = {
  entry: [
    path.resolve(__dirname, 'src', 'index'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.js`,
    library: filename,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  externals: {
    'react': 'react',
    'react-dom' : 'reactDOM',
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css!postcss'),
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new ExtractTextPlugin(`${filename}.css`)
  ],
};

if (minify) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    })
  );
}

module.exports = config
