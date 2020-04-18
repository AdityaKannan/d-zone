const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  devtool: prod ? 'source-map' : 'inline-source-map',
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{loader: 'ts-loader'}]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          prod
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ],

  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },


  devServer: {
    contentBase: Path.join(__dirname, '.'),
    compress: true,
    port: 9000
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
