
// storybook支持TS配置

module.exports = ({ config }) => {
  config.module.rules.push({

    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ],
    test: /\.tsx?$/
  });

  config.resolve.extensions.push(".ts", ".tsx","jsx");

  return config;
};
