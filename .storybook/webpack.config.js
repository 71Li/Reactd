
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
        // 自动生成文档插件
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop)=>{
            if(prop.parent){
              return !prop.parent.fileName.includes('node_modules')
            }
            return true
          }
        }
      },
      {
        loader: 'style-loader'
      }
    ],
    test: /\.tsx?$/
  });

  config.resolve.extensions.push(".ts", ".tsx",".jsx");

  return config;
};
