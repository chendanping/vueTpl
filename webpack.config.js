const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
    // publicPath: "/"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter")
        },
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-preset-env")()]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "img/[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "media/[hash:7].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8092,
              name: "font/[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "template"
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, scss, sass}"]
    })
  ],
  devServer: {
    hot: true,
    compress: true,
    overlay: true,
    open: true,
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      "/api": {
        target: "https://www.easy-mock.com/mock/5d26f202f02d453153b5edf2",
        changeOrigin: true
      }
    }
  },
  devtool: "eval-source-map"
};
