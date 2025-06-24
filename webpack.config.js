module.exports = {
    entry: './demo/index.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    devServer: {
      static: './demo',
      open: true,
      port: 8080
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
  