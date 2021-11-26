const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 注意格式
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader:  ExtractTextPlugin.extract(['css-loader', 'sass-loader','style-loader'])
          }
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      { // 自动生成文档插件
        test: /\.tsx?$/,
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true
          }}},
    ],


  },
  addons: ['@storybook/preset-create-react-app'],

  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ]
}

