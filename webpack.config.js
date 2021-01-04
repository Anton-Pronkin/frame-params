const path = require("path");

module.exports = {
  entry: {
      popup: "./src/scripts/popup.js",
      options: "./src/scripts/options.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "app/scripts/"),
    filename: "[name].min.js"
  },
  devtool: 'cheap-module-source-map'
};