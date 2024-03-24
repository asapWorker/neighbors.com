const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = 5000;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "bundle.[contenthash].js"
  },

  devServer: {
    port: PORT,
    open: true,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },

      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ],
      },

      {
        test: /\.svg$/i,
        use: ["url-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    })
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
}