import {addDecorator, addParameters, configure} from '@storybook/react';
import {withInfo} from '@storybook/addon-info'
import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"

library.add(fas)

// 全局配置样式，以及组件说明
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
    const allExports = [require('../src/welcome.stories.tsx')];
    const req = require.context('../src/component', true, /\.stories\.tsx$/);
    req.keys().forEach(fname => allExports.push(req(fname)));
    return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);

