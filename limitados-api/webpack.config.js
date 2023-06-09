const path = require('path-browserify');

module.exports = {
  mode: 'development', // Defina 'development' ou 'production' conforme necessário

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify")
    }
  }
};