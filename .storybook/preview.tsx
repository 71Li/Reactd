import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"
library.add(fas)

// 全局配置样式，以及组件说明
// @ts-ignore
const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}
const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>
      <h3>组件演示</h3>
      {storyFn()}
    </div>
)
addDecorator(storyWrapper)

// @ts-ignore
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})
const loaderFn = () => {
  const allExports = [];
  const req = require.context('../src/component', true, /\.stories\.tsx$/);
  // @ts-ignore
    req.keys().forEach(fnName => allExports.push(req(fnName)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
