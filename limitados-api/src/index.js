const path = require('path');

module.exports = {
  entry: './src/index.js', // Update with the correct entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // Add any necessary loaders and plugins for your project
};
